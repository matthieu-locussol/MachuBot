import type { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/rest/v9';
import { existsSync, rmSync } from 'fs';
import { resolve } from 'path';
import { shouldPersistPayload } from './file';

describe(__filename, () => {
   describe('shouldPersistPayload', () => {
      const payload: RESTPostAPIApplicationCommandsJSONBody[] = [
         {
            name: 'ping',
            description: 'Ping the bot',
            options: [],
            default_permission: undefined,
         },
      ];

      test('No persisted file', async () => {
         const filePath = resolve(__dirname, '../../logs/__tests_commandsPayload_1.log');

         if (existsSync(filePath)) {
            rmSync(filePath);
         }

         const result = await shouldPersistPayload(filePath, payload);
         expect(result).toEqual(true);
      });

      test('Persisted file', async () => {
         const filePath = resolve(__dirname, '../../logs/__tests_commandsPayload_2.log');

         if (existsSync(filePath)) {
            rmSync(filePath);
         }

         const firstResult = await shouldPersistPayload(filePath, payload);
         expect(firstResult).toEqual(true);

         const secondResult = await shouldPersistPayload(filePath, payload);
         expect(secondResult).toEqual(false);
      });

      test('Different persisted payload', async () => {
         const filePath = resolve(__dirname, '../../logs/__tests_commandsPayload_3.log');

         if (existsSync(filePath)) {
            rmSync(filePath);
         }

         const firstResult = await shouldPersistPayload(filePath, []);
         expect(firstResult).toEqual(true);

         const secondResult = await shouldPersistPayload(filePath, payload);
         expect(secondResult).toEqual(true);

         const thirdResult = await shouldPersistPayload(filePath, payload);
         expect(thirdResult).toEqual(false);
      });
   });
});
