import { MessageEmbed } from 'discord.js';
import { description, version } from '../../../../../package.json';

interface StatusEmbedPayload {
   coinGeckoStatus: string;
}

export const makeStatusEmbed = ({ coinGeckoStatus }: StatusEmbedPayload): MessageEmbed =>
   new MessageEmbed()
      .setTitle(`MachuBot - Version ${version}`)
      .setDescription(
         `${description}\n*Made by [Matthieu Locussol](https://www.matthieu-locussol.com/)*`,
      )
      .setURL('https://github.com/matthieu-locussol/MachuBot')
      .setColor('BLUE')
      .setFooter(`Informations about APIs - MachuBot`)
      .setFields([
         {
            name: coinGeckoStatus,
            value: '[See the CoinGecko documentation](https://www.coingecko.com/en/api/documentation)',
         },
      ]);
