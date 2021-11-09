import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../../../types';

export const pingCommand: Command = {
   data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Ping the bot'),
   execute: async (interaction) => {
      if (interaction.isCommand()) {
         interaction.reply('Pong!');
      }
   },
};
