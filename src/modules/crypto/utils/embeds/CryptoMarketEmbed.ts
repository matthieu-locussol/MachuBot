import { MessageEmbed } from 'discord.js';
import { formatInt } from '../../../../utils/number';
import { getCryptoDominationMarkdown } from '../formatters';

const COINGECKO_LOGO_URL =
   'https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png';

export interface CryptoMarketEmbedPayload {
   marketCap: number;
   marketCapChange1d: number;
   volume: number;
   currencies: number;
   upcomingIcos: number;
   ongoingIcos: number;
   domination: {
      name: string;
      percentage: number;
   }[];
}

export const makeCryptoMarketEmbed = (payload: CryptoMarketEmbedPayload): MessageEmbed =>
   new MessageEmbed()
      .setTitle('Market Capitalization')
      .setURL('https://www.coingecko.com/fr')
      .setColor('GOLD')
      .setThumbnail(COINGECKO_LOGO_URL)
      .setFooter({
         text: 'Infos about the global market - MachuBot',
         iconURL: COINGECKO_LOGO_URL,
      })
      .setFields([
         {
            name: 'Market Cap',
            value: `${formatInt(payload.marketCap)}$`,
            inline: true,
         },
         {
            name: 'In 24h',
            value: `${formatInt(payload.marketCapChange1d)}%`,
            inline: true,
         },
         {
            name: 'Total Volume',
            value: `${formatInt(payload.volume)}$`,
            inline: true,
         },
         {
            name: 'Currencies',
            value: String(payload.currencies),
            inline: true,
         },
         {
            name: 'Upcoming ICOs',
            value: String(payload.upcomingIcos),
            inline: true,
         },
         {
            name: 'Ongoing ICOs',
            value: String(payload.ongoingIcos),
            inline: true,
         },
         {
            name: 'Domination',
            value: getCryptoDominationMarkdown(payload.domination),
            inline: true,
         },
      ]);
