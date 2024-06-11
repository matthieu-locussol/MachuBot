import Keyv from 'keyv';
import { accessEnvironmentVariable } from './environment';

export interface Survey {
   authorId: string;
   channelId: string;
   selectCustomId: string;
   question: string;
   answers: string[];
   results: Record<number, string[]>;
   multiple: boolean;
}

interface GuildDatabase {
   osu: {
      usernames: Record<string, number>;
   };
   music: {
      volume: number;
   };
   surveys: {
      [messageId: string]: Survey;
   };
}

const defaultDatabase: GuildDatabase = {
   osu: {
      usernames: {},
   },
   music: {
      volume: 30,
   },
   surveys: {},
};

export interface GuildDatabaseMutator extends GuildDatabase {
   save: () => Promise<void>;
}

const loadDatabase = (): Keyv<GuildDatabase> => {
   const keyv = new Keyv<GuildDatabase>(
      accessEnvironmentVariable('MYSQL_URL_DEVELOPMENT', 'MYSQL_URL_PRODUCTION'),
   );
   return keyv;
};

export const loadGuildDatabase = async (guildId: string): Promise<GuildDatabaseMutator> => {
   const database = loadDatabase();
   const guildDatabase = (await database.get(guildId)) || defaultDatabase;

   if (guildDatabase.music === undefined) {
      guildDatabase.music = defaultDatabase.music;
   }

   if (guildDatabase.surveys === undefined) {
      guildDatabase.surveys = defaultDatabase.surveys;
   }

   return {
      ...guildDatabase,
      save: async () => {
         await database.set(guildId, guildDatabase);
      },
   };
};
