import Keyv from 'keyv';

interface GuildDatabase {
   osu: {
      usernames: Record<string, number>;
   };
}

const defaultDatabase: GuildDatabase = {
   osu: {
      usernames: {},
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

   return {
      ...guildDatabase,
      save: async () => {
         await database.set(guildId, guildDatabase);
      },
   };
};
