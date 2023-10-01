import { AttachmentExtractor, YoutubeExtractor } from '@discord-player/extractor';
import { GuildQueuePlayerNode, Player } from 'discord-player';
import {
   Client,
   ComponentType,
   ContextMenuCommandBuilder,
   GatewayIntentBits,
   REST,
   RESTPostAPIApplicationCommandsJSONBody,
   Routes,
   SlashCommandBuilder,
} from 'discord.js';
import { resolve } from 'path';
import { version } from '../package.json';
import { logger } from './logger';
import { Component } from './types/components';
import type { Module } from './types/modules';
import { _assert } from './utils/_assert';
import { accessEnvironmentVariable } from './utils/environment';
import { shouldPersistPayload } from './utils/file';
import {
   chatInputCommandsGuard,
   commandsUnicityGuard,
   componentsUnicityGuard,
   contextMenuMessageCommandsGuard,
   contextMenuUserCommandsGuard,
} from './utils/guards';

type SerializableInteraction =
   | Pick<SlashCommandBuilder, 'toJSON'>
   | Pick<ContextMenuCommandBuilder, 'toJSON'>;

export class Bot {
   private token: string;

   private clientId: string;

   private rest: REST;

   private client: Client;

   private modules: Module[];

   private components: Component[] = [];

   private commands: SerializableInteraction[] = [];

   private musicPlayer: Player;

   constructor(modules: Module[]) {
      this.token = accessEnvironmentVariable(
         'DISCORD_TOKEN_PRODUCTION',
         'DISCORD_TOKEN_DEVELOPMENT',
      );
      this.clientId = accessEnvironmentVariable(
         'DISCORD_CLIENT_ID_PRODUCTION',
         'DISCORD_CLIENT_ID_DEVELOPMENT',
      );

      this.rest = new REST({ version: '9' }).setToken(this.token);
      this.client = new Client({
         intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.MessageContent,
         ],
         presence: {
            status: 'online',
            activities: [
               {
                  name: `v${version}`,
               },
            ],
         },
      });
      this.modules = modules;

      this.client.setMaxListeners(200);

      this.initializeModules();
      this.initializeComponents();
      this.initializeCommands();

      this.musicPlayer = new Player(this.client, {
         ytdlOptions: {
            quality: 'highestaudio',
            filter: 'audioonly',
            highWaterMark: 1 << 30,
         },
      });
      this.musicPlayer.extractors.register(AttachmentExtractor, {});
      this.musicPlayer.extractors.register(YoutubeExtractor, {}).then(() => {
         logger.info('Music player is ready!');
      });
   }

   public start = async (): Promise<void> => {
      if (process.env.NODE_ENV === 'production') {
         await this.initializeProduction();
      } else {
         await this.initializeDevelopment();
      }

      await this.client.login(this.token);
   };

   private initializeCommands = (): void => {
      const commands = this.modules.flatMap((module) => module.commands.map((command) => command));

      commandsUnicityGuard(commands);

      chatInputCommandsGuard(commands);
      contextMenuUserCommandsGuard(commands);
      contextMenuMessageCommandsGuard(commands);

      this.commands = commands.map((entry) => entry.data);
   };

   private initializeModules = (): void => {
      for (const module of this.modules) {
         for (const command of module.commands) {
            this.client.on('interactionCreate', async (interaction) => {
               if (
                  command.type === 'APPLICATION_COMMAND' &&
                  interaction.isCommand() &&
                  interaction.commandName === command.data.name
               ) {
                  await command.execute(interaction, this);
               } else if (
                  command.type === 'CONTEXT_MENU_COMMAND' &&
                  interaction.isContextMenuCommand() &&
                  interaction.commandName === command.data.name
               ) {
                  await command.execute(interaction, this);
               }
            });
         }

         for (const modal of module.modals) {
            this.client.on('interactionCreate', async (interaction) => {
               if (
                  interaction.isModalSubmit() &&
                  interaction.customId === modal.component.data.custom_id
               ) {
                  await modal.execute(interaction, this);
               }
            });
         }

         for (const listener of module.listeners) {
            this.client.on('messageCreate', async (message) => {
               if (!message.author.bot) {
                  await listener.execute(message, this);
               }
            });
         }
      }

      const modulesCount = this.modules.length;
      const modalsCount = this.modules.reduce((acc, curr) => acc + curr.modals.length, 0);
      logger.info(`${modulesCount} Modules registered!`);
      logger.info(`${modalsCount} Modals registered!`);
   };

   private initializeComponents = (): void => {
      this.components = this.modules.flatMap((module) => module.components);

      componentsUnicityGuard(this.components);

      for (const component of this.components) {
         this.client.on('interactionCreate', async (interaction) => {
            if (
               component.type === ComponentType.Button &&
               interaction.isButton() &&
               'custom_id' in component.component.data &&
               component.component.data.custom_id === interaction.customId
            ) {
               await component.execute(interaction, this);
            } else if (
               component.type === ComponentType.StringSelect &&
               interaction.isStringSelectMenu() &&
               component.component.data.custom_id === interaction.customId
            ) {
               await component.execute(interaction, this);
            }
         });
      }

      const componentsCount = this.components.length;
      logger.info(`${componentsCount} Components registered!`);
   };

   private persistCommands = async (
      filePath: string,
      callback: (payload: RESTPostAPIApplicationCommandsJSONBody[]) => Promise<void>,
   ): Promise<void> => {
      const payload = this.commands.map((command) => command.toJSON());
      const shouldPersist = await shouldPersistPayload(filePath, payload);

      if (shouldPersist) {
         logger.info('Persisting slash commands...');
         await callback(payload);
         logger.info('Done!');
      }
   };

   private initializeDevelopment = async (): Promise<void> => {
      await this.persistCommands(
         resolve(__dirname, '../logs/commandsPayload_development.log'),
         async (payload) => {
            _assert(process.env.DISCORD_DEVELOPMENT_SERVER_ID);

            await this.rest.put(
               Routes.applicationGuildCommands(
                  this.clientId,
                  process.env.DISCORD_DEVELOPMENT_SERVER_ID,
               ),
               { body: payload },
            );
         },
      );

      this.client.on('ready', async () => {
         _assert(this.client.user);
         logger.info(`Development bot started as ${this.client.user.tag}`);
      });
   };

   private initializeProduction = async (): Promise<void> => {
      await this.persistCommands(
         resolve(__dirname, '../logs/commandsPayload_production.log'),
         async (payload) => {
            await this.rest.put(Routes.applicationCommands(this.clientId), {
               body: payload,
            });
         },
      );

      this.client.on('ready', () => {
         _assert(this.client.user);
         logger.info(`Production bot started as ${this.client.user.tag}`);
      });

      this.client.on('voiceStateUpdate', async (oldState, newState) => {
         const usersSongs = [
            {
               userId: '228887768699371522', // Pila
               channelId: '750445173506310196',
               songUrl:
                  'https://cdn.discordapp.com/attachments/706591844967907409/1110398989045608478/FBI.mp3',
            },
            {
               userId: '300712645302943744', // Joseph
               channelId: '750445173506310196',
               songUrl:
                  'https://cdn.discordapp.com/attachments/1131852548593156206/1156240773981929492/soulnsane.mp3',
            },
         ];

         for (const { userId, channelId, songUrl } of usersSongs) {
            if (
               newState.member?.id === userId &&
               newState.channelId === channelId &&
               oldState.channelId !== channelId
            ) {
               const queue = this.musicPlayer.queues.has(newState.guild.id)
                  ? this.musicPlayer.queues.get(newState.guild.id)
                  : undefined;
               const queuePlayerNode = queue ? new GuildQueuePlayerNode(queue) : undefined;

               if (queuePlayerNode === undefined || queuePlayerNode.isIdle()) {
                  setTimeout(() => {
                     this.musicPlayer.play(channelId, songUrl);
                  }, 1500);
               }
            }
         }
      });
   };

   getMusicPlayer(): Player {
      return this.musicPlayer;
   }
}
