import { ButtonInteraction, CommandInteraction, MessageActionRow } from 'discord.js';
import { bestButtonComponent } from '../../components/ui/bestButtonComponent';
import { getUserBests } from '../../utils/api';
import { getSavedUserId, getUserId } from '../../utils/username';

export const osuBest = async (
   interaction: CommandInteraction | ButtonInteraction,
   username: string | null,
): Promise<void> => {
   await interaction.deferReply();

   const userId = username === null ? await getSavedUserId(interaction) : await getUserId(username);

   if (userId !== undefined) {
      const bests = await getUserBests(userId);

      if (bests.length !== 0) {
         await interaction.editReply({
            content: bests
               .slice(0, 10)
               .map((b) => b.pp)
               .join('\n'),
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
