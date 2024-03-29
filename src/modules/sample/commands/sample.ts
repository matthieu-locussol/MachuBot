import {
   ActionRowBuilder,
   ButtonBuilder,
   SlashCommandBuilder,
   SlashCommandStringOption,
   SlashCommandSubcommandBuilder,
} from 'discord.js';
import type { ChatInputCommand } from '../../../types/commands';
import { buttonComponent } from '../components/ui/buttonComponent';
import { buttonModalComponent } from '../components/ui/buttonModalComponent';
import { buttonSecondaryComponent } from '../components/ui/buttonSecondaryComponent';
import { selectComponent } from '../components/ui/selectComponent';

export const sampleCommand: ChatInputCommand = {
   type: 'APPLICATION_COMMAND',
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
                  .addChoices(
                     {
                        name: 'Button',
                        value: 'button',
                     },
                     {
                        name: 'Select menu',
                        value: 'select_menu',
                     },
                     {
                        name: 'Modal',
                        value: 'modal',
                     },
                  )
                  .setRequired(true),
            ),
      )
      .addSubcommand(
         new SlashCommandSubcommandBuilder().setName('simple').setDescription('Simple subcommand'),
      ),
   execute: async (interaction) => {
      if (!interaction.isChatInputCommand()) {
         return;
      }

      if (interaction.options.getSubcommand() === 'sub_sample') {
         const chosenInteraction = interaction.options.getString('interaction', true);

         if (chosenInteraction === 'button') {
            const row = new ActionRowBuilder<ButtonBuilder>({
               components: [buttonComponent, buttonSecondaryComponent],
            });

            interaction.reply({
               content: 'Here is a button',
               components: [row],
            });
         } else if (chosenInteraction === 'select_menu') {
            const row = new ActionRowBuilder<ButtonBuilder>({
               components: [selectComponent],
            });

            interaction.reply({
               content: 'Here is a select menu',
               components: [row],
            });
         } else if (chosenInteraction === 'modal') {
            const row = new ActionRowBuilder<ButtonBuilder>({
               components: [buttonModalComponent],
            });

            interaction.reply({
               content: 'Here is a button opening a modal',
               components: [row],
            });
         }
      } else if (interaction.options.getSubcommand() === 'simple') {
         interaction.reply('Here is a simple answer');
      }
   },
};
