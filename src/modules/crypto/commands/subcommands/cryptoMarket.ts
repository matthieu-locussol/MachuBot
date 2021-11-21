import axios from 'axios';
import { CommandInteraction } from 'discord.js';
import { makeCryptoMarketEmbed } from '../../utils/embeds/CryptoMarketEmbed';

interface CoinGeckoGlobalResponse {
   data: {
      active_cryptocurrencies: number;
      upcoming_icos: number;
      ongoing_icos: number;
      total_market_cap: Record<string, number>;
      total_volume: Record<string, number>;
      market_cap_percentage: Record<string, number>;
      market_cap_change_percentage_24h_usd: number;
   };
}

export const cryptoMarket = async (interaction: CommandInteraction): Promise<void> => {
   await interaction.deferReply();

   const response = await axios.get<CoinGeckoGlobalResponse>(
      'https://api.coingecko.com/api/v3/global',
   );
   const results = response.data.data;

   await interaction.editReply({
      embeds: [
         makeCryptoMarketEmbed({
            marketCap: results.total_market_cap.usd,
            marketCapChange1d: results.market_cap_change_percentage_24h_usd,
            volume: results.total_volume.usd,
            currencies: results.active_cryptocurrencies,
            upcomingIcos: results.upcoming_icos,
            ongoingIcos: results.ongoing_icos,
            domination: Object.entries(results.market_cap_percentage)
               .slice(0, 3)
               .map(([name, percentage]) => ({
                  name,
                  percentage,
               })),
         }),
      ],
   });
};
