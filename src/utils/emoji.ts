import { GuildEmoji, GuildManager } from 'discord.js';
import { _assert } from './_assert';

export type Emoji =
   | 'Binance'
   | 'CoinGecko'
   | 'CoinMarketCap'
   | 'RankA'
   | 'RankB'
   | 'RankC'
   | 'RankD'
   | 'RankF'
   | 'RankS'
   | 'RankSH'
   | 'RankX'
   | 'RankXH';

export const getEmoji = (guildManager: GuildManager, name: Emoji): GuildEmoji => {
   const guild = guildManager.cache.find(
      (entry) => entry.id === process.env.DISCORD_EMOJIS_SERVER_ID,
   );
   _assert(guild, 'No emojis server has been registered!');

   const emoji = guild.emojis.cache.find((e) => e.name === name);
   _assert(emoji, `Could not find emoji: ${name}!`);

   return emoji;
};
