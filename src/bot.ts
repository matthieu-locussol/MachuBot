import {
   AttachmentExtractor,
   SoundCloudExtractor,
   YoutubeExtractor,
} from '@discord-player/extractor';
import { GuildQueuePlayerNode, Player } from 'discord-player';
import {
   Client,
   ComponentType,
   ContextMenuCommandBuilder,
   GatewayIntentBits,
   MessageType,
   REST,
   RESTPostAPIApplicationCommandsJSONBody,
   Routes,
   SlashCommandBuilder,
} from 'discord.js';
import OpenAI from 'openai';
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

const openAIClient = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

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

   private assistant: OpenAI.Beta.Assistants.Assistant | null = null;

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

      this.initializeAssistant();

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
      this.musicPlayer.extractors.register(AttachmentExtractor, {}).then(() => {
         logger.info('AttachmentExtractor is ready!');
      });
      this.musicPlayer.extractors.register(YoutubeExtractor, {}).then(() => {
         logger.info('YoutubeExtractor is ready!');
      });
      this.musicPlayer.extractors.register(SoundCloudExtractor, {}).then(() => {
         logger.info('SoundCloudExtractor is ready!');
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

   private initializeAssistant = async (): Promise<void> => {
      _assert(process.env.OPENAI_ASSISTANT_ID, 'No OpenAI assistant ID provided!');
      this.assistant = await openAIClient.beta.assistants.retrieve(process.env.OPENAI_ASSISTANT_ID);
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
      this.initializeAI();
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
      this.initializeAI();
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
               channelId: -1,
               songsUrl: ['https://soundcloud.com/matthieu-locussol/rodrigo'],
            },
         ];

         for (const { userId, channelId, songsUrl } of usersSongs) {
            const shouldPlaySongAnyway = newState.member?.id === userId && channelId === -1;

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

   private static getUserNameFromId = (userId: string): string =>
      ({
         '228887768699371522': 'Pila',
         '300712645302943744': 'Joseph',
         '230726394621984768': 'Matthieu',
         '395715726888927233': 'Colin',
         '312899742243880960': 'Swissex',
         '147081133920747520': 'Gautier',
         '219196232050933760': 'Balat',
         '221565144482840576': 'Norick',
         '228250481938399234': 'Benben',
         '242599007824773121': 'Valentin',
         '714135787163091025': 'Natsuki',
         '144503481502400514': 'Hugo',
      }[userId] ?? 'UNKNOWN');

   private initializeAI = (): void => {
      this.client.on('messageCreate', async (message) => {
         if (message.author.bot) {
            return;
         }

         if (
            message.content.includes('@here') ||
            message.content.includes('@everyone') ||
            message.type === MessageType.Reply
         ) {
            return;
         }

         _assert(this.client.user);
         if (!message.mentions.has(this.client.user.id)) {
            return;
         }

         _assert(this.assistant, 'No OpenAI assistant initialized!');

         const thread = await openAIClient.beta.threads.create({
            messages: [
               {
                  role: 'user',
                  content: message.content,
                  file_ids: [],
               },
            ],
         });

         const run = await openAIClient.beta.threads.runs.create(thread.id, {
            assistant_id: this.assistant.id,
            additional_instructions: `Ton interlocuteur est : ${Bot.getUserNameFromId(
               message.author.id,
            )}`,
         });

         const periodicallyRetrieveAnswer = async () => {
            let lastRunStatus: OpenAI.Beta.Threads.Runs.Run;

            while (run.status === 'queued' || run.status === 'in_progress') {
               lastRunStatus = await openAIClient.beta.threads.runs.retrieve(thread.id, run.id);

               if (lastRunStatus.status === 'completed') {
                  const messages = await openAIClient.beta.threads.messages.list(thread.id);
                  const assistantMessage = messages.data[0].content[0];

                  if (assistantMessage.type === 'text') {
                     await message.reply(assistantMessage.text.value);
                  }

                  break;
               } else if (
                  lastRunStatus.status === 'queued' ||
                  lastRunStatus.status === 'in_progress'
               ) {
                  await new Promise((res) => {
                     setTimeout(res, 500);
                  });
               } else {
                  logger.error('Run status:', lastRunStatus.status);
                  break;
               }
            }
         };

         periodicallyRetrieveAnswer();
      });
   };

   getMusicPlayer(): Player {
      return this.musicPlayer;
   }
}
