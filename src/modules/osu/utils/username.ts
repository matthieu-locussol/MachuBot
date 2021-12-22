import type { ButtonInteraction, CommandInteraction } from 'discord.js';
import { logger } from '../../../logger';
import { loadGuildDatabase } from '../../../utils/database';
import { getUser } from './api';

export const getSavedUserId = async (
   interaction: CommandInteraction | ButtonInteraction,
): Promise<number | undefined> => {
   const database = await loadGuildDatabase(interaction.guildId);
   const userId = interaction.member.user.id;
   return database.osu.usernames[userId];
};

export const getUserId = async (username: string): Promise<number | undefined> => {
   try {
      const osuUser = await getUser(username);
      return osuUser.id;
   } catch (e) {
      logger.error('username/getUserId:', e);
      return undefined;
   }
};
