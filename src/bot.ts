import {
   AttachmentBuilder,
   Client,
   Colors,
   ComponentType,
   ContextMenuCommandBuilder,
   EmbedBuilder,
   GatewayIntentBits,
   REST,
   RESTPostAPIApplicationCommandsJSONBody,
   Routes,
   SlashCommandBuilder,
} from 'discord.js';
import cron from 'node-cron';
import { resolve } from 'path';
import { version } from '../package.json';
import { logger } from './logger';
import { answerSelectHandler } from './modules/surveys/components/handlers/answerSelectHandler';
import { Component } from './types/components';
import type { Module } from './types/modules';
import { _assert } from './utils/_assert';
import { getDailyQuestion } from './utils/consultationCitoyenne';
import { formatDateTime } from './utils/date';
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

interface ConsultationCitoyenneProps {
   serverId: string;
   channelId: string;
   threadId: string;
   cronExpression: string;
}

export class Bot {
   private token: string;

   private clientId: string;

   private rest: REST;

   private client: Client;

   private modules: Module[];

   private components: Component[] = [];

   private commands: SerializableInteraction[] = [];

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

      // Emoji Server
      this.initializeConsultationCitoyenne({
         serverId: '850789853658611742',
         channelId: '1342876364801310770',
         threadId: '1342876409370116158',
         cronExpression: '* * * * *', // Every minute
      });

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

      // The High Community
      this.initializeConsultationCitoyenne({
         serverId: '228479029357969409',
         channelId: '1314967988088209500',
         threadId: '1324750804430753894',
         cronExpression: '0 12 * * *', // Every day at 12:00
      });

      this.client.on('ready', () => {
         _assert(this.client.user);
         logger.info(`Production bot started as ${this.client.user.tag}`);
      });
   };

   private initializeConsultationCitoyenne({
      serverId,
      channelId,
      threadId,
      cronExpression,
   }: ConsultationCitoyenneProps) {
      logger.info('[CRON] Starting Consultation Citoyenne cron...');

      cron.schedule(cronExpression, async () => {
         logger.info('[CRON] Attempting to send Consultation Citoyenne...');

         try {
            const guild = await this.client.guilds.fetch(serverId);
            const thread = await guild.channels.fetch(threadId);

            if (!thread?.isThread()) {
               logger.error('[CRON] Thread not found or not a thread.');
               return;
            }

            if (thread.parentId !== channelId) {
               logger.error('[CRON] Thread is not in the specified channel.');
               return;
            }

            const attachment = new AttachmentBuilder('assets/Avatar.png', { name: 'Avatar.png' });

            const { question, surveyAnswers } = getDailyQuestion();

            const message = await thread.send({
               embeds: [
                  new EmbedBuilder()
                     .setTitle('Consultation Citoyenne')
                     .setURL('https://www.matthieu-locussol.com')
                     .setColor(Colors.Blurple)
                     .setThumbnail('attachment://Avatar.png')
                     .setFooter({
                        text: `${formatDateTime(new Date().toISOString())} - MachuBot`,
                        iconURL: 'attachment://Avatar.png',
                     })
                     .setFields({
                        name: '**Question du jour**',
                        value: question,
                     }),
               ],
               files: [attachment],
            });

            if (surveyAnswers.length > 0) {
               await message.reply({
                  poll: {
                     question: { text: 'Choisis bien ta réponse fils de pute' },
                     answers: surveyAnswers.map((answer) => ({ text: answer })),
                     allowMultiselect: false,
                     duration: 23,
                  },
               });
            }

            logger.info('[CRON] Consultation Citoyenne sent successfully.');
         } catch (error) {
            logger.error('[CRON] Error sending Consultation Citoyenne:', error);
         }
      });

      logger.info('[CRON] Consultation Citoyenne cron started!');
   }
}
