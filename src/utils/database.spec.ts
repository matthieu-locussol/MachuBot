import Keyv from 'keyv';
import { loadGuildDatabase } from './database';

describe(__filename, () => {
   test('Initialize database', async () => {
      const database = await loadGuildDatabase('tests');
      expect(database.osu.usernames).toStrictEqual({});
      expect(typeof database.save).toBe('function');
   });

   test('Save data to database', async () => {
      const databaseInstance1 = await loadGuildDatabase('tests');
      databaseInstance1.osu.usernames.userId = 'username';

      const databaseInstance2 = await loadGuildDatabase('tests');
      expect(databaseInstance2.osu.usernames.userId).toStrictEqual('username');
   });

   test('Save multiple data to database', async () => {
      const databaseVariable1 = await loadGuildDatabase('tests');
      const databaseVariable2 = await loadGuildDatabase('tests');
      const databaseVariable3 = await loadGuildDatabase('tests');

      databaseVariable1.osu.usernames.userId1 = 'username';
      databaseVariable2.osu.usernames.userId2 = 'username';
      databaseVariable3.osu.usernames.userId3 = 'username';

      const database = await loadGuildDatabase('tests');

      expect(database.osu.usernames.userId1).toBe('username');
      expect(database.osu.usernames.userId2).toBe('username');
      expect(database.osu.usernames.userId3).toBe('username');
   });

   afterAll(() => {
      const databases = new Keyv('sqlite://database.sqlite');
      databases.delete('tests');
   });
});
