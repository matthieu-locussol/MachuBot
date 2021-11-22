import { GuildManager } from 'discord.js';
import { Emoji, getEmoji } from './emoji';

describe(__filename, () => {
   const mockedGuildManager = {
      cache: [
         {
            id: 'emojiServerId',
            emojis: {
               cache: [
                  {
                     name: 'emojiId',
                  },
               ],
            },
         },
      ],
   } as unknown as GuildManager;

   test('Undefined emojis server', () => {
      expect(() => getEmoji(mockedGuildManager, 'emojiId' as Emoji)).toThrow();
   });

   test('Undefined emoji', () => {
      process.env.DISCORD_EMOJIS_SERVER_ID = 'emojiServerId';
      expect(() => getEmoji(mockedGuildManager, 'emojiId_false' as Emoji)).toThrow();
   });

   test('Defined emoji', () => {
      process.env.DISCORD_EMOJIS_SERVER_ID = 'emojiServerId';
      expect(getEmoji(mockedGuildManager, 'emojiId' as Emoji)).toEqual({ name: 'emojiId' });
   });
});
