import {
   SlashCommandBuilder,
   SlashCommandIntegerOption,
   SlashCommandStringOption,
   SlashCommandSubcommandBuilder,
} from 'discord.js';
import { ChatInputCommand } from '../../../types/commands';
import { clamp } from '../../../utils/number';
import { DICE_TYPE, roll } from './roll';

export const diceCommand: ChatInputCommand = {
   type: 'APPLICATION_COMMAND',
   data: new SlashCommandBuilder()
      .setName('dice')
      .setDescription('Roll some dices')
      .addSubcommand(
         new SlashCommandSubcommandBuilder()
            .setName('roll')
            .setDescription('Roll some dices')
            .addStringOption(
               new SlashCommandStringOption()
                  .setName('type')
                  .setDescription('What kind of dice do yout want to roll? (default: d6)')
                  .addChoices(
                     {
                        name: 'D6',
                        value: 'd6',
                     },
                     {
                        name: 'D12',
                        value: 'd12',
                     },
                     {
                        name: 'D20',
                        value: 'd20',
                     },
                  )
                  .setRequired(false),
            )
            .addIntegerOption(
               new SlashCommandIntegerOption()
                  .setName('count')
                  .setDescription('How many dices do you want to roll? (default: 1)')
                  .setRequired(false),
            ),
      ),
   execute: async (interaction) => {
      if (!interaction.isChatInputCommand()) {
         return;
      }

      if (interaction.options.getSubcommand() === 'roll') {
         const type = (interaction.options.getString('type') as DICE_TYPE) || 'd6';
         const count = interaction.options.getInteger('count') || 1;
         const finalCount = clamp(count, 1, 24);

         await roll(interaction, type, finalCount);
      }
   },
};
