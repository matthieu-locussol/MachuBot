import axios from 'axios';
import type { CommandInteraction } from 'discord.js';
import { MessageActionRow, MessageButton } from 'discord.js';
import { getEmoji } from '../../../../utils/emoji';
import { makeCoinChart } from '../../utils/embeds/CryptoCoinChart';
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
      const coinId = encodeURIComponent(id);
      const coinResponse = await axios.get<CoinGeckoCoinsResponse>(
         `https://api.coingecko.com/api/v3/coins/${coinId}`,
      );
      const coinResults = coinResponse.data;
      const chartAttachment = await makeCoinChart(coinId, currency, 'chart.png');

      await interaction.editReply({
         files: [chartAttachment],
         embeds: [
            makeCryptoCoinEmbed({
               rank: coinResults.market_cap_rank,
               name: coinResults.name,
               symbol: coinResults.symbol.toUpperCase(),
               currency,
               thumbnail: coinResults.image.thumb,
               image: coinResults.image.large,
               homepage: coinResults.links.homepage[0],
               priceChanges: {
                  '1d': coinResults.market_data.price_change_percentage_24h,
                  '7d': coinResults.market_data.price_change_percentage_7d,
                  '30d': coinResults.market_data.price_change_percentage_30d,
                  '60d': coinResults.market_data.price_change_percentage_60d,
                  '1y': coinResults.market_data.price_change_percentage_1y,
               },
               marketCap: coinResults.market_data.market_cap[currency],
               currentPrice: coinResults.market_data.current_price[currency],
               ath: coinResults.market_data.ath[currency],
               chart: 'attachment://chart.png',
            }),
         ],
         components: [
            new MessageActionRow({
               components: [
                  new MessageButton()
                     .setLabel('View on CoinGecko')
                     .setEmoji(getEmoji(interaction.client.guilds, 'CoinGecko'))
                     .setStyle('LINK')
                     .setURL(`https://www.coingecko.com/en/coins/${coinId}`),
               ],
            }),
         ],
      });
   } catch (e) {
      await interaction.editReply(
         `Could not find the \`${id}\` cryptocurrency!\nPlease type a CoinGecko coin id (like \`bitcoin\`), not a symbol (like \`BTC\`).`,
      );
   }
};
