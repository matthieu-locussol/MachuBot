import { AttachmentExtractor, SoundCloudExtractor } from '@discord-player/extractor';
import { GuildQueuePlayerNode, Player } from 'discord-player';
import { YoutubeiExtractor } from 'discord-player-youtubei';
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
import { answerSelectHandler } from './modules/surveys/components/handlers/answerSelectHandler';
import { Component } from './types/components';
import type { Module } from './types/modules';
import { _assert } from './utils/_assert';
import { pickRandom } from './utils/array';
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

      this.musicPlayer.extractors.register(YoutubeiExtractor, {}).then(() => {
         logger.info('YoutubeExtractor is ready!');
      });

      this.musicPlayer.extractors.register(AttachmentExtractor, {}).then(() => {
         logger.info('AttachmentExtractor is ready!');
      });

      this.musicPlayer.extractors.register(SoundCloudExtractor, {}).then(() => {
         logger.info('SoundCloudExtractor is ready!');
      });

      this.musicPlayer.extractors.loadDefault(
         (ext) => !['YouTubeExtractor', 'SpotifyExtractor', 'AttachmentExtractor'].includes(ext),
      );
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

      this.client.on('interactionCreate', async (interaction) => {
         if (
            interaction.isStringSelectMenu() &&
            interaction.customId.startsWith('surveyAnswerSelect-')
         ) {
            await answerSelectHandler(interaction, this);
         }
      });

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

      this.initializeJoinSounds();
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

      this.initializeJoinSounds();
   };

   private initializeJoinSounds = (): void => {
      this.client.on('voiceStateUpdate', async (oldState, newState) => {
         const usersSongs = [
            {
               userId: '228887768699371522', // Pila
               channelId: '750445173506310196',
               songsUrl: ['https://soundcloud.com/matthieu-locussol/fbi'],
            },
            {
               userId: '300712645302943744', // Joseph
               channelId: '750445173506310196',
               songsUrl: [
                  // 'https://soundcloud.com/matthieu-locussol/soulnsane',
                  'https://soundcloud.com/matthieu-locussol/mephisto-youre-too-late-hahahahahahaha',
                  'https://soundcloud.com/matthieu-locussol/the-sanctity-of-this-place-has-been-fouled',
               ],
            },
            {
               userId: '230726394621984768', // Matthieu
               channelId: '750445173506310196',
               songsUrl: [
                  'https://soundcloud.com/matthieu-locussol/parle-de-moi-1',
                  'https://soundcloud.com/matthieu-locussol/parle-de-moi-2',
                  'https://soundcloud.com/matthieu-locussol/parle-de-moi-3',
               ],
            },
            {
               userId: '196946198567845898', // Diego
               channelId: '750445173506310196',
               songsUrl: [
                  'https://soundcloud.com/matthieu-locussol/rodrigo',
                  'https://soundcloud.com/matthieu-locussol/sabalero',
                  'https://soundcloud.com/matthieu-locussol/ole-ole-diego',
                  'https://soundcloud.com/matthieu-locussol/maradona-guy2bez',
               ],
            },
         ];

         for (const { userId, channelId, songsUrl } of usersSongs) {
            const shouldPlaySongAnyway = newState.member?.id === userId && channelId === '-1';

            if (
               (newState.member?.id === userId &&
                  newState.channelId === channelId &&
                  oldState.channelId !== channelId) ||
               shouldPlaySongAnyway
            ) {
               const queue = this.musicPlayer.queues.has(newState.guild.id)
                  ? this.musicPlayer.queues.get(newState.guild.id)
                  : undefined;
               const queuePlayerNode = queue ? new GuildQueuePlayerNode(queue) : undefined;

               if (queuePlayerNode === undefined || queuePlayerNode.isIdle()) {
                  // eslint-disable-next-line @typescript-eslint/no-loop-func
                  setTimeout(() => {
                     if (newState.channelId !== null) {
                        this.musicPlayer.play(newState.channelId, pickRandom(songsUrl), {
                           nodeOptions: {
                              leaveOnEnd: false,
                              leaveOnEmpty: true,
                              leaveOnEmptyCooldown: 5000,
                              leaveOnStop: false,
                           },
                        });
                     }
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
