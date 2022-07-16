import { ButtonInteraction, CommandInteraction, MessageActionRow } from 'discord.js';
import { formatTimeAgo } from '../../../../utils/date';
import { Emoji, getEmoji } from '../../../../utils/emoji';
import { clamp, formatCommas, formatFloat } from '../../../../utils/number';
import { bestButtonComponent } from '../../components/ui/bestButtonComponent';
import { getUser, getUserBests } from '../../utils/api';
import { makeOsuBestEmbed, OsuBestEmbedPayload } from '../../utils/embeds/OsuBestEmbed';
import { getSavedUserId, getUserId } from '../../utils/username';

export const osuBest = async (
   interaction: CommandInteraction | ButtonInteraction,
   username: string | null,
   count: number | null,
): Promise<void> => {
   await interaction.deferReply();

   const userId = username === null ? await getSavedUserId(interaction) : await getUserId(username);

   if (userId !== undefined) {
      const bestsCount = clamp(count || 5, 1, 25);
      const [user, bests] = await Promise.all([getUser(userId), getUserBests(userId, bestsCount)]);

      if (bests.length !== 0) {
         const embedPayload: OsuBestEmbedPayload = {
            player: user.username,
            playerUrl: `https://osu.ppy.sh/users/${userId}`,
            playerAvatarUrl: user.avatar_url,
            ppUser: formatFloat(user.statistics.pp, 2),
            country: user.country_code,
            countryRank: formatCommas(user.statistics.country_rank),
            worldRank: formatCommas(user.statistics.global_rank),
            thumbnail: user.avatar_url,
            topOneRank: bests[0].rank,
            scores: bests.map(
               ({
                  rank,
                  mods,
                  beatmapset: { title },
                  pp,
                  accuracy,
                  beatmap: { version, url },
                  created_at,
               }) => ({
                  emoji: getEmoji(interaction.client.guilds, `Rank${rank}` as Emoji),
                  mods,
                  title,
                  pp: String(pp),
                  accuracy: formatFloat(accuracy * 100, 2),
                  difficulty: version,
                  url,
                  date: formatTimeAgo(created_at),
               }),
            ),
         };
         const embed = makeOsuBestEmbed(embedPayload);

         await interaction.editReply({
            embeds: [embed],
            components: [
               new MessageActionRow({
                  components: [bestButtonComponent],
               }),
            ],
         });
      } else {
         await interaction.editReply(
            `Could not find any best play for the player \`${username}\`!`,
         );
      }
   } else if (username === undefined) {
      await interaction.editReply(
         `You don't have any osu nickname associated to your discord account!`,
      );
   } else {
      await interaction.editReply(`Could not find any best play for the player \`${username}\`!`);
   }
};
