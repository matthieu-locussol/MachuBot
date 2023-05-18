import {
   SlashCommandBuilder,
   SlashCommandIntegerOption,
   SlashCommandStringOption,
   SlashCommandSubcommandBuilder,
} from 'discord.js';
import type { ChatInputCommand } from '../../../types/commands';
import { osuAssociate } from './subcommands/osuAssociate';
import { osuBest } from './subcommands/osuBest';
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
      )
      .addSubcommand(
         new SlashCommandSubcommandBuilder()
            .setName('best')
            .setDescription('Returns the best plays for an osu! user')
            .addStringOption(
               new SlashCommandStringOption()
                  .setName('username')
                  .setDescription('The osu! username you want to get the best plays'),
            )
            .addIntegerOption(
               new SlashCommandIntegerOption()
                  .setName('count')
                  .setDescription(
                     'How many best scores do you want to retrieve? (between 1 and 25 included)',
                  ),
            ),
      ),
   execute: async (interaction) => {
      if (!interaction.isChatInputCommand()) {
         return;
      }

      if (interaction.options.getSubcommand() === 'associate') {
         const username = interaction.options.getString('username', true);
         await osuAssociate(interaction, username);
      } else if (interaction.options.getSubcommand() === 'recent') {
         const username = interaction.options.getString('username');
         const index = interaction.options.getInteger('index');
         await osuRecent(interaction, username, index);
      } else if (interaction.options.getSubcommand() === 'best') {
         const username = interaction.options.getString('username');
         const count = interaction.options.getInteger('count');
         await osuBest(interaction, username, count);
      }
   },
};
