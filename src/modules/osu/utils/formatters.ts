import { GuildEmoji } from 'discord.js';
import { DateTime } from 'luxon';
import { formatTimeAgo } from '../../../utils/date';
import { formatCommas, formatFloat, secondsToDuration } from '../../../utils/number';
import { toUpperFirst } from '../../../utils/string';
import type { OsuPP, UserBest } from './api';

export const recentAuthorFormatter = (
   player: string,
   ppUser: string,
   worldRank: string,
   country: string,
   countryRank: string,
): string => `${player}: ${ppUser}pp | WR • #${worldRank} | ${country} • #${countryRank}`;

export const recentTitleFormatter = (artist: string, title: string, difficulty: string): string =>
   `${artist} - ${title} [${difficulty}]`;

export const recentDescriptionFormatter = (
   bestIndex: number | null,
   worldIndex: number | null,
): string | null => {
   const fragments: string[] = [];

   if (worldIndex !== null) {
      fragments.push(`***World record #${worldIndex}***`);
   }

   if (bestIndex !== null) {
      fragments.push(`***Personal record #${bestIndex}***`);
   }

   const output = fragments.join(' • ');
   return output.length > 0 ? output : null;
};

export const recentScoreFormatter = (
   emoji: GuildEmoji,
   mods: string[],
   score: number,
   accuracy: string,
   date: string,
   progress?: string,
): string => {
   const fragments: string[] = [];

   if (progress !== undefined) {
      fragments.push(`${emoji} (${progress}%)`);
   } else {
      fragments.push(emoji.toString());
   }

   if (mods.length > 0) {
      fragments.push(`+${mods.join('')}`);
   }

   fragments.push(formatCommas(score));
   fragments.push(`${accuracy}%`);
   fragments.push(formatTimeAgo(date));

   return fragments.join(' • ');
};

export const recentDetailsFormatter = (
   combo: number,
   perfect: boolean,
   statistics: UserBest['statistics'],
   pp: number | null,
   ppInfos: OsuPP | null,
   loadingEmoji: GuildEmoji | string = '(...)',
): string => {
   const fragments: string[][] = [[], []];

   const realPP = pp !== null ? formatFloat(pp, 2) : loadingEmoji;
   const fcPP = ppInfos !== null ? formatFloat(ppInfos.ppPerfect, 2) : loadingEmoji;

   if (perfect) {
      fragments[0].push(`**${realPP}pp →** **FC**`);
   } else {
      fragments[0].push(`**${realPP}pp →** ${fcPP}pp if FC`);
   }

   if (ppInfos !== null) {
      fragments[0].push(`**${combo}x**/${ppInfos.maxCombo}x`);
   } else {
      fragments[0].push(`**${combo}x**/${loadingEmoji}x`);
   }

   fragments[1].push(`**${statistics.count_300}**x300`);
   fragments[1].push(`**${statistics.count_100}**x100`);
   fragments[1].push(`**${statistics.count_50}**x50`);
   fragments[1].push(`**${statistics.count_miss}**xMiss`);

   return fragments.map((fragment) => fragment.join(' • ')).join('\n');
};

export const recentMapInformationsFormatter = (
   length: number,
   cs: string,
   hp: string,
   od: string | null,
   ar: string | null,
   bpm: number,
   stars: string | null,
   loadingEmoji: GuildEmoji | string = '(...)',
): string => {
   const fragments: string[] = [];

   fragments.push(secondsToDuration(length));

   if (od !== null && ar !== null) {
      fragments.push(`CS**${cs}** HP**${hp}** OD**${od}** AR**${ar}**`);
   } else {
      fragments.push(`CS**${cs}** HP**${hp}** OD**${loadingEmoji}** AR**${loadingEmoji}**`);
   }

   fragments.push(`BPM**${bpm}**`);

   if (stars !== null) {
      fragments.push(`**${stars}** ★`);
   } else {
      fragments.push(`**${loadingEmoji}** ★`);
   }

   return fragments.join(' • ');
};

export const recentFooterFormatter = (
   beatmapAuthor: string,
   beatmapApproval: string,
   approvalDate: string,
): string => `Mapped by ${beatmapAuthor} • ${toUpperFirst(beatmapApproval)} on ${approvalDate}`;

export const formatApprovalDate = (approvalDate: string): string => {
   const dateStr = approvalDate.split('T')[0];
   const date = DateTime.fromISO(dateStr);

   if (date.isValid) {
      return date.toLocaleString(DateTime.DATE_MED, { locale: 'en' });
   }

   return 'Unknown';
};

export const bestScoreNameFormatter = (
   emoji: GuildEmoji,
   mods: string[],
   title: string,
): string => {
   const fragments: string[] = [];

   fragments.push(emoji.toString());

   if (mods.length > 0) {
      fragments.push(`+${mods.join('')}`);
   }

   fragments.push(title);

   return fragments.join(' • ');
};

export const bestScoreValueFormatter = (
   pp: string,
   accuracy: string,
   difficulty: string,
   url: string,
   date: string,
): string => {
   const fragments: string[] = [];

   fragments.push(`**${pp}pp**`);
   fragments.push(`${accuracy}%`);
   fragments.push(`[[${difficulty}]](${url})`);
   fragments.push(date);

   return fragments.join(' • ');
};
