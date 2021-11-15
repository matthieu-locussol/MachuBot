import { SlashCommandBuilder } from '@discordjs/builders';
import type { ChatInputCommand } from '../../../types';

export const pingCommand: ChatInputCommand = {
   type: 'APPLICATION_COMMAND',
   data: new SlashCommandBuilder().setName('ping').setDescription('Ping the bot'),
   execute: async (interaction) => {
      interaction.reply(`Delay: ${interaction.client.ws.ping}ms`);
   },
};
