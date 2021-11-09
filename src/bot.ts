import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, Intents } from 'discord.js';
import { log } from './logger';
import { Module } from './types';
import { _assert } from './utils/_assert';

export class Bot {
   private rest: REST;

   private client: Client;

   private commands: SlashCommandBuilder[];

   constructor(modules: Module[]) {
      this.rest = new REST({ version: '9' }).setToken(this.getToken());
      this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
      this.commands = this.extractCommands(modules);
      this.initializeModules(modules);
   }

   public start = async (): Promise<void> => {
      if (process.env.NODE_ENV === 'production') {
         await this.initializeProduction();
      } else {
         await this.initializeDevelopment();
      }

      this.client.login(this.getToken());
   };

   private extractCommands = (modules: Module[]): SlashCommandBuilder[] =>
      modules.flatMap((module) =>
         module.commands.map((command) => command.data),
      );

   private initializeModules = (modules: Module[]): void => {
      for (const module of modules) {
         for (const command of module.commands) {
            this.client.on('interactionCreate', (interaction) =>
               command.execute(interaction),
            );
         }
      }
   };

   private initializeDevelopment = async (): Promise<void> => {
      if ((() => 1)() === 2) {
         await this.rest.put(
            Routes.applicationGuildCommands(
               this.getClientId(),
               '850789853658611742',
            ),
            { body: this.commands },
         );
      }

      this.client.on('ready', () => {
         _assert(this.client.user);
         log(`Development bot started as ${this.client.user.tag}`);
      });
   };

   private initializeProduction = async (): Promise<void> => {
      await this.rest.put(Routes.applicationCommands(this.getClientId()), {
         body: this.commands.map((command) => command.toJSON()),
      });

      this.client.on('ready', () => {
         _assert(this.client.user);
         log(`Production bot started as ${this.client.user.tag}`);
      });
   };

   private getToken = (): string =>
      this.accessEnvironmentVariable(
         'DISCORD_TOKEN_PRODUCTION',
         'DISCORD_TOKEN_DEVELOPMENT',
      );

   private getClientId = (): string =>
      this.accessEnvironmentVariable(
         'DISCORD_CLIENT_ID_PRODUCTION',
         'DISCORD_CLIENT_ID_DEVELOPMENT',
      );

   private accessEnvironmentVariable = (
      productionName: string,
      developmentName: string,
   ): string => {
      const productionVariable = process.env[productionName];
      const developmentVariable = process.env[developmentName];

      if (process.env.NODE_ENV === 'production') {
         _assert(productionVariable);
         return productionVariable;
      }

      _assert(developmentVariable);
      return developmentVariable;
   };
}
