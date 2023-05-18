import { ApplicationCommandType, ContextMenuCommandBuilder } from 'discord.js';
import type { ContextMenuCommand } from '../../../types/commands';
import { _assert, _assertTrue } from '../../../utils/_assert';

export const sampleContextMessageCommand: ContextMenuCommand = {
   type: 'CONTEXT_MENU_COMMAND',
   data: new ContextMenuCommandBuilder()
      .setName('sampleContextMessage')
      .setType(ApplicationCommandType.Message),
   execute: async (interaction) => {
      _assertTrue(interaction.options.data.length > 0);
      _assert(interaction.options.data[0].message);
      const { message } = interaction.options.data[0];

      interaction.reply(`User wrote: ${message.content}`);
   },
};
