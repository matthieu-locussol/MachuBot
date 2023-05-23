import { AttachmentBuilder, Colors, EmbedBuilder } from 'discord.js';
import { description, version } from '../../../../../package.json';

interface StatusEmbedPayload {
   coinGeckoStatus: string;
   osuStatus: string;
}

export const makeStatusEmbed = ({
   coinGeckoStatus,
   osuStatus,
}: StatusEmbedPayload): {
   embed: EmbedBuilder;
   attachment: AttachmentBuilder;
} => {
   const attachment = new AttachmentBuilder('assets/Avatar.png', { name: 'Avatar.png' });
   const embed = new EmbedBuilder()
      .setThumbnail('attachment://Avatar.png')
      .setTitle(`MachuBot - Version ${version}`)
      .setDescription(
         `${description}\n*Made by [Matthieu Locussol](https://www.matthieu-locussol.com/)*`,
      )
      .setURL('https://github.com/matthieu-locussol/MachuBot')
      .setColor(Colors.Blue)
      .setFooter({
         text: `Informations about APIs - MachuBot`,
      })
      .setFields([
         {
            name: coinGeckoStatus,
            value: '[See the CoinGecko documentation](https://www.coingecko.com/en/api/documentation)',
         },
         {
            name: osuStatus,
            value: '[See the Osu! documentation](https://osu.ppy.sh/docs/index.html)',
         },
      ]);

   return { embed, attachment };
};
