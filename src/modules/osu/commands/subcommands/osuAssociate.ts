import { CommandInteraction } from 'discord.js';
import { loadGuildDatabase } from '../../../../utils/database';

export const osuAssociate = async (
   interaction: CommandInteraction,
   username: string,
): Promise<void> => {
   await interaction.deferReply();

   const userId = interaction.member.user.id;
   const database = await loadGuildDatabase(interaction.guildId);
   database.osu.usernames[userId] = username;
   database.save();

   await interaction.editReply(username);
};
