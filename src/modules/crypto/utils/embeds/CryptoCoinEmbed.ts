import { MessageEmbed } from 'discord.js';
import { formatFloat } from '../../../../utils/number';
import { getColoredValue, getPriceValue } from '../formatters';

export interface CryptoCoinEmbedPayload {
   rank: number | null;
   name: string;
   symbol: string;
   currency: string;
   thumbnail: string;
   image: string;
   homepage: string;
   priceChanges: {
      '1d': number;
      '7d': number;
      '30d': number;
      '60d': number;
      '1y': number;
   };
   marketCap: number;
   currentPrice: number;
   ath: number;
}

export const makeCryptoCoinEmbed = (payload: CryptoCoinEmbedPayload): MessageEmbed =>
   new MessageEmbed()
      .setTitle(`#${payload.rank || '?'} ${payload.name} (${payload.symbol})`)
      .setURL(payload.homepage)
      .setColor(payload.priceChanges['1d'] >= 0 ? 'GREEN' : 'RED')
      .setThumbnail(payload.image)
      .setFooter(
         `Infos about the ${payload.name} (${payload.symbol}) - MachuBot`,
         payload.thumbnail,
      )
      .setFields([
         {
            name: payload.currency.toUpperCase(),
            value: getPriceValue(formatFloat(payload.currentPrice, 8), payload.currency),
            inline: true,
         },
         {
            name: 'ATH',
            value: getPriceValue(formatFloat(payload.ath, 8), payload.currency),
            inline: true,
         },
         {
            name: 'Market Cap',
            value: getPriceValue(formatFloat(payload.marketCap), payload.currency),
            inline: true,
         },
         {
            name: 'Change (1d)',
            value: getColoredValue(payload.priceChanges['1d'], '%'),
            inline: true,
         },
         {
            name: 'Change (1w)',
            value: getColoredValue(payload.priceChanges['7d'], '%'),
            inline: true,
         },
         {
            name: 'Change (1m)',
            value: getColoredValue(payload.priceChanges['30d'], '%'),
            inline: true,
         },
         {
            name: 'Change (2m)',
            value: getColoredValue(payload.priceChanges['60d'], '%'),
            inline: true,
         },
         {
            name: 'Change (1y)',
            value: getColoredValue(payload.priceChanges['1y'], '%'),
            inline: true,
         },
      ]);
