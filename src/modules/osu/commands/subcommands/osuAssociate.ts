import type { CommandInteraction } from 'discord.js';
import { logger } from '../../../../logger';
import { loadGuildDatabase } from '../../../../utils/database';
import { getUser } from '../../utils/api';

export const osuAssociate = async (
   interaction: CommandInteraction,
   username: string,
): Promise<void> => {
   await interaction.deferReply();

   if (interaction.member === null || interaction.guildId === null) {
      await interaction.editReply(
         `This command is supposed to be used inside a discord server channel by a server member.`,
      );

      return;
   }

   const userId = interaction.member.user.id;
   const database = await loadGuildDatabase(interaction.guildId);

   try {
      const osuUser = await getUser(username);
      database.osu.usernames[userId] = osuUser.id;
      await database.save();

      await interaction.editReply(
         `Your discord account has been associated to the nickname \`${username}\` on osu!.`,
      );
   } catch (e) {
      logger.error('osu/associate:', e);
      await interaction.editReply(
         `An error occurred, please try again. Make sure the nickname \`${username}\` exists on osu!.`,
      );
   }
};
