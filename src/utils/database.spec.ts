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
      databaseInstance1.osu.usernames.userId = 123456;

      const databaseInstance2 = await loadGuildDatabase('tests');
      expect(databaseInstance2.osu.usernames.userId).toStrictEqual(123456);
   });

   test('Save multiple data to database', async () => {
      const databaseVariable1 = await loadGuildDatabase('tests');
      const databaseVariable2 = await loadGuildDatabase('tests');
      const databaseVariable3 = await loadGuildDatabase('tests');

      databaseVariable1.osu.usernames.userId1 = 123456;
      databaseVariable2.osu.usernames.userId2 = 234567;
      databaseVariable3.osu.usernames.userId3 = 345678;

      const database = await loadGuildDatabase('tests');

      expect(database.osu.usernames.userId1).toBe(123456);
      expect(database.osu.usernames.userId2).toBe(234567);
      expect(database.osu.usernames.userId3).toBe(345678);
   });

   afterAll(() => {
      const databases = new Keyv('sqlite://database.sqlite');
      databases.delete('tests');
   });
});
