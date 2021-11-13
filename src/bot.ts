import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord-api-types/v9';
import { Client, Intents } from 'discord.js';
import { resolve } from 'path';
import { log } from './logger';
import type { Module } from './types';
import { accessEnvironmentVariable } from './utils/accessEnvironmentVariable';
import { shouldPersistCommandsPayload } from './utils/shouldPersistCommandsPayload';
import { _assert } from './utils/_assert';

export class Bot {
   private token: string;

   private clientId: string;

   private rest: REST;

   private client: Client;

   private modules: Module[];

   private commands: SlashCommandBuilder[] = [];

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
      this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
      this.modules = modules;

      this.initializeCommands();
      this.initializeModules();
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
      this.commands = this.modules.flatMap((module) =>
         module.commands.map((command) => command.data),
      );
   };

   private initializeModules = (): void => {
      for (const module of this.modules) {
         for (const command of module.commands) {
            this.client.on('interactionCreate', async (interaction) => {
               await command.execute(interaction);
            });
         }
      }
   };

   private persistSlashCommands = async (
      filePath: string,
      callback: (payload: RESTPostAPIApplicationCommandsJSONBody[]) => Promise<void>,
   ): Promise<void> => {
      const payload = this.commands.map((command) => command.toJSON());
      const shouldPersist = await shouldPersistCommandsPayload(filePath, payload);

      if (shouldPersist) {
         log('Persisting slash commands...');
         await callback(payload);
         log('Done!');
      }
   };

   private initializeDevelopment = async (): Promise<void> => {
      await this.persistSlashCommands(
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
         log(`Development bot started as ${this.client.user.tag}`);
      });
   };

   private initializeProduction = async (): Promise<void> => {
      await this.persistSlashCommands(
         resolve(__dirname, '../logs/commandsPayload_production.log'),
         async (payload) => {
            await this.rest.put(Routes.applicationCommands(this.clientId), {
               body: payload,
            });
         },
      );

      this.client.on('ready', () => {
         _assert(this.client.user);
         log(`Production bot started as ${this.client.user.tag}`);
      });
   };
}
