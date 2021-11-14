import {
   SlashCommandBuilder,
   SlashCommandStringOption,
   SlashCommandSubcommandBuilder,
} from '@discordjs/builders';
import { MessageActionRow } from 'discord.js';
import { buttonComponent } from '../../../components/button';
import { selectComponent } from '../../../components/select';
import type { Command } from '../../../types';

export const sampleCommand: Command = {
   data: new SlashCommandBuilder()
      .setName('sample')
      .setDescription('Sample command with interactions')
      .addSubcommand(
         new SlashCommandSubcommandBuilder()
            .setName('sub_sample')
            .setDescription('Sample subcommand')
            .addStringOption(
               new SlashCommandStringOption()
                  .setName('interaction')
                  .setDescription('Try an interaction')
                  .addChoices([
                     ['Button', 'button'],
                     ['Select menu', 'select_menu'],
                  ])
                  .setRequired(true),
            ),
      )
      .addSubcommand(
         new SlashCommandSubcommandBuilder().setName('simple').setDescription('Simple subcommand'),
      ),
   execute: async (interaction) => {
      if (interaction.options.getSubcommand() === 'sub_sample') {
         const chosenInteraction = interaction.options.getString('interaction', true);

         if (chosenInteraction === 'button') {
            const row = new MessageActionRow({
               components: [buttonComponent.component],
            });

            interaction.reply({
               content: 'Here is a button',
               components: [row],
            });
         } else if (chosenInteraction === 'select_menu') {
            const row = new MessageActionRow({
               components: [selectComponent.component],
            });

            interaction.reply({
               content: 'Here is a select menu',
               components: [row],
            });
         }
      } else if (interaction.options.getSubcommand() === 'simple') {
         interaction.reply('Here is a simple answer');
      }
   },
};
