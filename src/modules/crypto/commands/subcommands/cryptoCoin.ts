import axios from 'axios';
import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js';
import { makeCryptoCoinEmbed } from '../../utils/embeds/CryptoCoinEmbed';

interface CoinGeckoCoinsResponse {
   symbol: string;
   name: string;
   links: {
      homepage: string[];
   };
   image: {
      thumb: string;
      large: string;
   };
   market_cap_rank: number | null;
   market_data: {
      current_price: Record<string, number>;
      ath: Record<string, number>;
      market_cap: Record<string, number>;
      price_change_percentage_24h: number;
      price_change_percentage_7d: number;
      price_change_percentage_30d: number;
      price_change_percentage_60d: number;
      price_change_percentage_1y: number;
   };
}

export const cryptoCoin = async (
   interaction: CommandInteraction,
   id: string,
   currency: string,
): Promise<void> => {
   await interaction.deferReply();

   try {
      const response = await axios.get<CoinGeckoCoinsResponse>(
         `https://api.coingecko.com/api/v3/coins/${id}`,
      );
      const results = response.data;

      await interaction.editReply({
         embeds: [
            makeCryptoCoinEmbed({
               rank: results.market_cap_rank,
               name: results.name,
               symbol: results.symbol.toUpperCase(),
               currency,
               thumbnail: results.image.thumb,
               image: results.image.large,
               homepage: results.links.homepage[0],
               priceChanges: {
                  '1d': results.market_data.price_change_percentage_24h,
                  '7d': results.market_data.price_change_percentage_7d,
                  '30d': results.market_data.price_change_percentage_30d,
                  '60d': results.market_data.price_change_percentage_60d,
                  '1y': results.market_data.price_change_percentage_1y,
               },
               marketCap: results.market_data.market_cap[currency],
               currentPrice: results.market_data.current_price[currency],
               ath: results.market_data.ath[currency],
            }),
         ],
         components: [
            new MessageActionRow({
               components: [
                  new MessageButton()
                     .setLabel('View on CoinGecko')
                     .setStyle('LINK')
                     .setURL(`https://www.coingecko.com/en/coins/${results.name.toLowerCase()}`),
               ],
            }),
         ],
      });
   } catch (e) {
      await interaction.editReply(`Could not find the \`${id}\` cryptocurrency!`);
   }
};
