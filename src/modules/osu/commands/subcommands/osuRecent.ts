import {
   ActionRowBuilder,
   ButtonBuilder,
   ButtonInteraction,
   ButtonStyle,
   CommandInteraction,
} from 'discord.js';
import type { Emoji } from '../../../../utils/emoji';
import { getEmoji } from '../../../../utils/emoji';
import { clamp, formatCommas, formatFloat } from '../../../../utils/number';
import { recentButtonComponent } from '../../components/ui/recentButtonComponent';
import { getOsuPP, getScore, getUser, getUserBests, getUserRecent } from '../../utils/api';
import { makeOsuRecentEmbed } from '../../utils/embeds/OsuRecentEmbed';
import { formatApprovalDate } from '../../utils/formatters';
import { Mod } from '../../utils/mods';
import { computeProgress } from '../../utils/progress';
import { isBestScore } from '../../utils/score';
import { getSavedUserId, getUserId } from '../../utils/username';
import { weightToRank } from '../../utils/weight';

export const osuRecent = async (
   interaction: CommandInteraction | ButtonInteraction,
   username: string | null,
   index: number | null,
): Promise<void> => {
   await interaction.deferReply();

   const guildManager = interaction.client.guilds;
   const userId = username === null ? await getSavedUserId(interaction) : await getUserId(username);
   const recentIndex = clamp(index || 1, 1, 50);

   if (userId !== undefined) {
      const [recent, user, bests] = await Promise.all([
         getUserRecent(userId, recentIndex),
         getUser(userId),
         getUserBests(userId),
      ]);

      if (recent === undefined) {
         await interaction.editReply(`No recent score found for the user \`${user.username}\`!`);
      } else {
         const embedPayload = {
            player: recent.user.username,
            playerUrl: `https://osu.ppy.sh/users/${userId}`,
            playerAvatarUrl: user.avatar_url,
            ppUser: formatFloat(user.statistics.pp, 2),
            artist: recent.beatmapset.artist,
            title: recent.beatmapset.title,
            difficulty: recent.beatmap.version,
            worldIndex: null,
            worldRank: formatCommas(user.statistics.global_rank),
            bestIndex: null,
            perfect: recent.perfect,
            statistics: recent.statistics,
            pp: null,
            ppInfos: null,
            country: recent.user.country_code,
            countryRank: formatCommas(user.statistics.country_rank),
            emoji: getEmoji(interaction.client.guilds, `Rank${recent.rank}` as Emoji),
            approvalDate: formatApprovalDate(recent.beatmap.last_updated),
            beatmapApproval: recent.beatmap.status,
            beatmapSetId: recent.beatmapset.id,
            beatmapId: recent.beatmap.id,
            beatmapAuthor: recent.beatmapset.creator,
            beatmapAuthorId: recent.beatmapset.user_id,
            thumbnail: recent.beatmapset.covers.list,
            url: recent.beatmap.url,
            rank: recent.rank,
            accuracy: formatFloat(recent.accuracy * 100, 2),
            mods: recent.mods,
            score: recent.score,
            progress: recent.passed
               ? undefined
               : computeProgress(recent.statistics, recent.beatmap),
            combo: recent.max_combo,
            length: recent.beatmap.total_length,
            cs: formatFloat(recent.beatmap.cs, 2),
            hp: formatFloat(recent.beatmap.drain, 2),
            od: null,
            ar: null,
            bpm: recent.beatmap.bpm,
            stars: null,
            date: recent.created_at,
            loadingEmoji: getEmoji(guildManager, 'loading'),
         };

         const row = new ActionRowBuilder<ButtonBuilder>({
            components: [
               recentButtonComponent,
               new ButtonBuilder()
                  .setLabel('Download map')
                  .setStyle(ButtonStyle.Link)
                  .setURL(`https://api.chimu.moe/v1/download/${recent.beatmapset.id}?n=1`),
            ],
         });

         await interaction.editReply({
            embeds: [makeOsuRecentEmbed(embedPayload)],
            components: [row],
         });

         const bestId = recent.best_id;

         const scorePromise = bestId !== null ? getScore(recent.mode, bestId) : null;
         const ppPromise = getOsuPP({
            beatmapId: recent.beatmap.id,
            mods: recent.mods as Mod[],
            accuracy: recent.accuracy * 100,
            combo: recent.max_combo,
            goods: recent.statistics.count_100,
            mehs: recent.statistics.count_50,
            misses: recent.statistics.count_miss,
            passedObjects:
               recent.statistics.count_300 +
               recent.statistics.count_100 +
               recent.statistics.count_50 +
               recent.statistics.count_miss,
         });
         const [score, ppInfos] = await Promise.all([scorePromise, ppPromise]);
         const bestScore = isBestScore(score, bests);

         await interaction.editReply({
            embeds: [
               makeOsuRecentEmbed({
                  ...embedPayload,
                  worldIndex: score && score.rank_global <= 500 ? score.rank_global : null,
                  bestIndex: bestScore ? weightToRank(bestScore.weight.percentage) : null,
                  pp: ppInfos.pp,
                  ppInfos,
                  od: formatFloat(ppInfos.od, 2),
                  ar: formatFloat(ppInfos.ar, 2),
                  stars: formatFloat(ppInfos.stars, 2),
               }),
            ],
            components: [row],
         });
      }
   } else if (username === undefined) {
      await interaction.editReply(
         `You don't have any osu nickname associated to your discord account!`,
      );
   } else {
      await interaction.editReply(`Could not find any recent play for the player \`${username}\`!`);
   }
};
