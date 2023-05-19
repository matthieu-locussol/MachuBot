import { SlashCommandBuilder } from 'discord.js';
import type { ChatInputCommand } from '../../../types/commands';

export const musicCommand: ChatInputCommand = {
   type: 'APPLICATION_COMMAND',
   data: new SlashCommandBuilder()
      .setName('music')
      .setDescription('Play music in a voice channel!'),
   execute: async (interaction) => {
      interaction.reply(`Music delay: ${interaction.client.ws.ping}ms`);
   },
};
