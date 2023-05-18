import { EmbedBuilder, GuildEmoji } from 'discord.js';
import { OSU_COLORS } from '../constants';
import {
   bestScoreNameFormatter,
   bestScoreValueFormatter,
   recentAuthorFormatter,
} from '../formatters';

export interface OsuBestEmbedPayload {
   player: string;
   ppUser: string;
   worldRank: string;
   country: string;
   countryRank: string;
   playerUrl: string;
   playerAvatarUrl: string;
   topOneRank: string;
   thumbnail: string;
   scores: {
      emoji: GuildEmoji;
      mods: string[];
      title: string;
      pp: string;
      accuracy: string;
      difficulty: string;
      url: string;
      date: string;
   }[];
}

export const makeOsuBestEmbed = (payload: OsuBestEmbedPayload): EmbedBuilder =>
   new EmbedBuilder()
      .setAuthor({
         name: recentAuthorFormatter(
            payload.player,
            payload.ppUser,
            payload.worldRank,
            payload.country,
            payload.countryRank,
         ),
         iconURL: `https://osu.ppy.sh/images/flags/${payload.country}.png`,
         url: payload.playerUrl,
      })
      .setColor(OSU_COLORS[payload.topOneRank])
      .setThumbnail(payload.thumbnail)
      .setFooter({
         text: `Informations about ${payload.player}'s best scores - MachuBot`,
         iconURL: 'https://osu.ppy.sh/images/favicon/favicon-32x32.png',
      })
      .setFields(
         payload.scores.map(({ emoji, mods, title, pp, accuracy, difficulty, url, date }) => ({
            name: bestScoreNameFormatter(emoji, mods, title),
            value: bestScoreValueFormatter(pp, accuracy, difficulty, url, date),
         })),
      );
