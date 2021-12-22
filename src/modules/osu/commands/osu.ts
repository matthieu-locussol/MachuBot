import {
   SlashCommandBuilder,
   SlashCommandIntegerOption,
   SlashCommandStringOption,
   SlashCommandSubcommandBuilder,
} from '@discordjs/builders';
import type { ChatInputCommand } from '../../../types/commands';
import { osuAssociate } from './subcommands/osuAssociate';
import { osuRecent } from './subcommands/osuRecent';

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
      )
      .addSubcommand(
         new SlashCommandSubcommandBuilder()
            .setName('recent')
            .setDescription('Returns a recent play for an osu! user')
            .addStringOption(
               new SlashCommandStringOption()
                  .setName('username')
                  .setDescription('The osu! username you want to get a recent play'),
            )
            .addIntegerOption(
               new SlashCommandIntegerOption()
                  .setName('index')
                  .setDescription(
                     'Which recent play do you want? The 1st? The 13th? (between 1 and 50 included)',
                  ),
            ),
      ),
   execute: async (interaction) => {
      if (interaction.options.getSubcommand() === 'associate') {
         const username = interaction.options.getString('username', true);
         await osuAssociate(interaction, username);
      } else if (interaction.options.getSubcommand() === 'recent') {
         const username = interaction.options.getString('username');
         const index = interaction.options.getInteger('index');
         await osuRecent(interaction, username, index);
      }
   },
};
