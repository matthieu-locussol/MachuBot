import { SlashCommandBuilder } from '@discordjs/builders';
import axios, { AxiosResponse } from 'axios';
import { ChatInputCommand } from '../../../types/commands';
import { getEmoji } from '../../../utils/emoji';
import { makeStatusEmbed } from '../utils/embeds/StatusEmbed';

interface CoinGeckoStatusResponse {
   gecko_says: string;
}

interface OsuStatusResponse {
   streams: {
      display_name: string;
      latest_build: {
         display_version: string;
      };
   }[];
}

interface OsuToolsApiStatusResponse {
   version: string;
}

export const statusCommand: ChatInputCommand = {
   type: 'APPLICATION_COMMAND',
   data: new SlashCommandBuilder()
      .setName('status')
      .setDescription('Informations about the bot & API status'),
   execute: async (interaction) => {
      await interaction.deferReply();

      const guildManager = interaction.client.guilds;

      const [coinGeckoStatus, osuStatus, osuToolsApiStatus] = await Promise.all([
         axios.get<CoinGeckoStatusResponse>('https://api.coingecko.com/api/v3/global'),
         axios.get<OsuStatusResponse>('https://osu.ppy.sh/api/v2/changelog'),
         axios.get<OsuToolsApiStatusResponse>(String(process.env.OSU_PP_ENDPOINT)),
      ]);

      const getStatusEmoji = (response: AxiosResponse) => {
         if (response.status === 200) {
            return getEmoji(guildManager, 'Correct');
         }

         return getEmoji(guildManager, 'Incorrect');
      };

      const getOsuVersion = (response: AxiosResponse<OsuStatusResponse>) => {
         if (response.status === 200) {
            const stream = osuStatus.data.streams[0];
            return `${stream.display_name}(v${stream.latest_build.display_version})`;
         }

         return '';
      };

      const getOsuToolsApiVersion = (response: AxiosResponse<OsuToolsApiStatusResponse>) => {
         if (response.status === 200) {
            return `(v${response.data.version})`;
         }

         return '';
      };

      await interaction.editReply({
         embeds: [
            makeStatusEmbed({
               coinGeckoStatus: `${getStatusEmoji(coinGeckoStatus)}\tCoinGecko status`,
               osuStatus: `${getStatusEmoji(osuStatus)}\tOsu status ${getOsuVersion(osuStatus)}`,
               osuToolsApiStatus: `${getStatusEmoji(
                  osuToolsApiStatus,
               )}\tOsu-tools-api status ${getOsuToolsApiVersion(osuToolsApiStatus)}`,
            }),
         ],
      });
   },
};
