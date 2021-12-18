import {
   SlashCommandBuilder,
   SlashCommandStringOption,
   SlashCommandSubcommandBuilder,
} from '@discordjs/builders';
import type { ChatInputCommand } from '../../../types/commands';
import { osuAssociate } from './subcommands/osuAssociate';

export const osuCommand: ChatInputCommand = {
   type: 'APPLICATION_COMMAND',
   data: new SlashCommandBuilder()
      .setName('osu')
      .setDescription('Osu! related commands')
      .addSubcommand(
         new SlashCommandSubcommandBuilder()
            .setName('associate')
            .setDescription('Associates an osu! username to your discord account')
            .addStringOption(
               new SlashCommandStringOption()
                  .setName('username')
                  .setDescription('Your osu! username to associate')
                  .setRequired(true),
            ),
      ),
   execute: async (interaction) => {
      if (interaction.options.getSubcommand() === 'associate') {
         const username = interaction.options.getString('username', true);
         await osuAssociate(interaction, username);
      }
   },
};
