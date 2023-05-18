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
         intents: [GatewayIntentBits.Guilds],
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
                  await command.execute(interaction);
               } else if (
                  command.type === 'CONTEXT_MENU_COMMAND' &&
                  interaction.isContextMenuCommand() &&
                  interaction.commandName === command.data.name
               ) {
                  await command.execute(interaction);
               }
            });
         }

         for (const modal of module.modals) {
            this.client.on('interactionCreate', async (interaction) => {
               if (
                  interaction.isModalSubmit() &&
                  interaction.customId === modal.component.data.custom_id
               ) {
                  await modal.execute(interaction);
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
               await component.execute(interaction);
            } else if (
               component.type === ComponentType.StringSelect &&
               interaction.isStringSelectMenu() &&
               component.component.data.custom_id === interaction.customId
            ) {
               await component.execute(interaction);
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

      this.client.on('ready', () => {
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
   };
}
