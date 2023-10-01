import {
   SlashCommandBooleanOption,
   SlashCommandBuilder,
   SlashCommandStringOption,
   SlashCommandSubcommandBuilder,
} from 'discord.js';
import { ChatInputCommand } from '../../../types/commands';
import { createSurvey } from './subcommands/create';

export const surveysCommand: ChatInputCommand = {
   type: 'APPLICATION_COMMAND',
   data: new SlashCommandBuilder()
      .setName('survey')
      .setDescription('Manage surveys')
      .addSubcommand(
         new SlashCommandSubcommandBuilder()
            .setName('create')
            .setDescription('Creates a new survey')
            .addStringOption(
               new SlashCommandStringOption()
                  .setName('question')
                  .setDescription('The question of the survey')
                  .setRequired(true),
            )
            .addStringOption(
               new SlashCommandStringOption()
                  .setName('answers')
                  .setDescription(
                     'The answers of the survey separated by a semicolon (;). Example: Yes;No;Maybe',
                  )
                  .setRequired(true),
            )
            .addBooleanOption(
               new SlashCommandBooleanOption()
                  .setName('multiple')
                  .setDescription(
                     'Whether the user can select multiple answers or not. Defaults to false.',
                  )
                  .setRequired(false),
            ),
      ),
   execute: async (interaction) => {
      if (!interaction.isChatInputCommand()) {
         return;
      }

      if (interaction.options.getSubcommand() === 'create') {
         const question = interaction.options.getString('question', true);
         const answers = interaction.options.getString('answers', true).split(';');
         const multiple = interaction.options.getBoolean('multiple') ?? false;

         try {
            await createSurvey(interaction, question, answers, multiple);
         } catch (error) {
            await interaction.editReply({
               content: `An error occured while creating the survey.`,
            });
         }
      }
   },
};
