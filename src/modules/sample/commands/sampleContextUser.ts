import { ApplicationCommandType, ContextMenuCommandBuilder } from 'discord.js';
import type { ContextMenuCommand } from '../../../types/commands';
import { _assert, _assertTrue } from '../../../utils/_assert';

export const sampleContextUserCommand: ContextMenuCommand = {
   type: 'CONTEXT_MENU_COMMAND',
   data: new ContextMenuCommandBuilder()
      .setName('sampleContextUser')
      .setType(ApplicationCommandType.User),
   execute: async (interaction) => {
      _assertTrue(interaction.options.data.length > 0);
      _assert(interaction.options.data[0].user);
      const { user } = interaction.options.data[0];

      interaction.reply(`User is: ${user.username}`);
   },
};
