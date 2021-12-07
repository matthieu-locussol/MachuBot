import { SlashCommandBuilder } from '@discordjs/builders';
import axios from 'axios';
import { ChatInputCommand } from '../../../types/commands';
import { getEmoji } from '../../../utils/emoji';
import { makeStatusEmbed } from '../utils/embeds/StatusEmbed';

interface CoinGeckoStatusResponse {
   gecko_says: string;
}

export const statusCommand: ChatInputCommand = {
   type: 'APPLICATION_COMMAND',
   data: new SlashCommandBuilder()
      .setName('status')
      .setDescription('Informations about the bot & API status'),
   execute: async (interaction) => {
      await interaction.deferReply();

      const guildManager = interaction.client.guilds;

      const coinGeckoStatus = await axios.get<CoinGeckoStatusResponse>(
         'https://api.coingecko.com/api/v3/global',
      );

      await interaction.editReply({
         embeds: [
            makeStatusEmbed({
               coinGeckoStatus: `${getEmoji(
                  guildManager,
                  coinGeckoStatus.status === 200 ? 'Correct' : 'Incorrect',
               )}\tCoinGecko status`,
            }),
         ],
      });
   },
};
