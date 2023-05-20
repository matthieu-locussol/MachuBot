import Keyv from 'keyv';

interface GuildDatabase {
   osu: {
      usernames: Record<string, number>;
   };
   music: {
      volume: number;
   };
}

const defaultDatabase: GuildDatabase = {
   osu: {
      usernames: {},
   },
   music: {
      volume: 50,
   },
};

interface GuildDatabaseMutator extends GuildDatabase {
   save: () => Promise<void>;
}

const loadDatabase = (): Keyv<GuildDatabase> => {
   const keyv = new Keyv<GuildDatabase>('sqlite://database.sqlite');
   return keyv;
};

export const loadGuildDatabase = async (guildId: string): Promise<GuildDatabaseMutator> => {
   const database = loadDatabase();
   const guildDatabase = (await database.get(guildId)) || defaultDatabase;

   if (guildDatabase.music === undefined) {
      guildDatabase.music = defaultDatabase.music;
   }

   return {
      ...guildDatabase,
      save: async () => {
         await database.set(guildId, guildDatabase);
      },
   };
};
