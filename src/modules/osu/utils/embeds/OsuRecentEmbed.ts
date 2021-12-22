import type { GuildEmoji } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import type { OsuPP, UserBest } from '../api';
import { OSU_COLORS } from '../constants';
import {
   recentAuthorFormatter,
   recentDescriptionFormatter,
   recentDetailsFormatter,
   recentFooterFormatter,
   recentMapInformationsFormatter,
   recentScoreFormatter,
   recentTitleFormatter,
} from '../formatters';

export interface OsuRecentEmbedPayload {
   player: string;
   playerUrl: string;
   playerAvatarUrl: string;
   perfect: boolean;
   pp: number | null;
   ppUser: string;
   statistics: UserBest['statistics'];
   artist: string;
   title: string;
   difficulty: string;
   worldIndex: number | null;
   bestIndex: number | null;
   worldRank: string;
   country: string;
   countryRank: string;
   rank: string;
   emoji: GuildEmoji;
   approvalDate: string;
   beatmapId: number;
   beatmapSetId: number;
   beatmapAuthor: string;
   beatmapAuthorId: number;
   beatmapApproval: string;
   thumbnail: string;
   url: string;
   mods: string[];
   score: number;
   accuracy: string;
   progress?: string;
   ppInfos: OsuPP | null;
   combo: number;
   length: number;
   cs: string;
   hp: string;
   od: string | null;
   ar: string | null;
   bpm: number;
   date: string;
   loadingEmoji: GuildEmoji;
}

export const makeOsuRecentEmbed = (payload: OsuRecentEmbedPayload): MessageEmbed =>
   new MessageEmbed()
      .setAuthor(
         recentAuthorFormatter(
            payload.player,
            payload.ppUser,
            payload.worldRank,
            payload.country,
            payload.countryRank,
         ),
         payload.playerAvatarUrl,
         payload.playerUrl,
      )
      .setTitle(recentTitleFormatter(payload.artist, payload.title, payload.difficulty))
      .setDescription(recentDescriptionFormatter(payload.bestIndex, payload.worldIndex))
      .setURL(payload.url)
      .setColor(OSU_COLORS[payload.rank])
      .setThumbnail(payload.thumbnail)
      .setFooter(
         recentFooterFormatter(
            payload.beatmapAuthor,
            payload.beatmapApproval,
            payload.approvalDate,
         ),
         `https://a.ppy.sh/${payload.beatmapAuthorId}`,
      )
      .setFields([
         {
            name: recentScoreFormatter(
               payload.emoji,
               payload.mods,
               payload.score,
               payload.accuracy,
               payload.date,
               payload.progress,
            ),
            value: recentDetailsFormatter(
               payload.combo,
               payload.perfect,
               payload.statistics,
               payload.pp,
               payload.ppInfos,
               payload.loadingEmoji,
            ),
         },
         {
            name: 'Map informations',
            value: recentMapInformationsFormatter(
               payload.length,
               payload.cs,
               payload.hp,
               payload.od,
               payload.ar,
               payload.bpm,
               payload.loadingEmoji,
            ),
         },
      ]);
