import {
   SlashCommandBuilder,
   SlashCommandStringOption,
   SlashCommandSubcommandBuilder,
} from '@discordjs/builders';
import type { ChatInputCommand } from '../../../types/commands';
import { cryptoCoin } from './subcommands/cryptoCoin';
import { cryptoMarket } from './subcommands/cryptoMarket';

export const cryptoCommand: ChatInputCommand = {
   type: 'APPLICATION_COMMAND',
   data: new SlashCommandBuilder()
      .setName('crypto')
      .setDescription('Informations about the cryptocurrency market')
      .addSubcommand(
         new SlashCommandSubcommandBuilder()
            .setName('market')
            .setDescription('Informations about the cryptocurrency market'),
      )
      .addSubcommand(
         new SlashCommandSubcommandBuilder()
            .setName('coin')
            .setDescription('Informations about a specific coin')
            .addStringOption(
               new SlashCommandStringOption()
                  .setName('id')
                  .setDescription('Coin id (e.g. "bitcoin")')
                  .setRequired(true),
            )
            .addStringOption(
               new SlashCommandStringOption()
                  .setName('currency')
                  .setDescription('Currency in which the value is displayed (default: USD)')
                  .addChoices(
                     {
                        name: 'EUR',
                        value: 'eur',
                     },
                     {
                        name: 'USD',
                        value: 'usd',
                     },
                  ),
            ),
      ),
   execute: async (interaction) => {
      if (interaction.options.getSubcommand() === 'market') {
         await cryptoMarket(interaction);
      } else if (interaction.options.getSubcommand() === 'coin') {
         const id = interaction.options.getString('id', true);
         const currency = interaction.options.getString('currency') || 'usd';
         await cryptoCoin(interaction, id, currency);
      }
   },
};
