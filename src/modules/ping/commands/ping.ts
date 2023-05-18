import { SlashCommandBuilder } from 'discord.js';
import type { ChatInputCommand } from '../../../types/commands';

export const pingCommand: ChatInputCommand = {
   type: 'APPLICATION_COMMAND',
   data: new SlashCommandBuilder().setName('ping').setDescription('Ping the bot'),
   execute: async (interaction) => {
      interaction.reply(`Delay: ${interaction.client.ws.ping}ms`);
   },
};
