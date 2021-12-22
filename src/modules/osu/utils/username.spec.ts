import axios from 'axios';
import type { CommandInteraction } from 'discord.js';
import Keyv from 'keyv';
import { loadGuildDatabase } from '../../../utils/database';
import { getSavedUserId, getUserId } from './username';

const makeMockedInteraction = (id: string) =>
   ({
      guildId: 'tests',
      member: {
         user: {
            id,
         },
      },
   } as unknown as CommandInteraction);

describe(__filename, () => {
   test('getSavedUserId', async () => {
      const database = await loadGuildDatabase('tests');
      database.osu.usernames['123'] = 456;

      const samples: [CommandInteraction, number | undefined][] = [
         [makeMockedInteraction('123456'), undefined],
         [makeMockedInteraction('123'), 456],
      ];

      for (const [input, output] of samples) {
         const userId = await getSavedUserId(input);
         expect(userId).toEqual(output);
      }

      const databases = new Keyv('sqlite://database.sqlite');
      databases.delete('tests');
   });

   test('getUserId', async () => {
      const mockedGet = jest.spyOn(axios, 'get').mockImplementation((url) => {
         if (!url.includes('none_')) {
            return Promise.resolve({ data: { id: 124493 } });
         }

         return Promise.reject();
      });
      const mockedPost = jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({}));

      const samples: [string, number | undefined][] = [
         ['none_', undefined],
         ['cookiezi', 124493],
         ['chocomint', 124493],
      ];

      for (const [input, output] of samples) {
         const userId = await getUserId(input);
         expect(userId).toEqual(output);
      }

      expect(mockedPost).toHaveBeenCalled();
      expect(mockedGet).toHaveBeenCalled();
   });
});
