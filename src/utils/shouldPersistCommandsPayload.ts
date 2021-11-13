import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/rest/v9';
import { existsSync, readFileSync, writeFileSync } from 'fs';

export const shouldPersistCommandsPayload = async (
   filePath: string,
   payload: RESTPostAPIApplicationCommandsJSONBody[],
): Promise<boolean> => {
   const stringifiedPayload = JSON.stringify(payload);

   if (existsSync(filePath)) {
      const fileBlob = readFileSync(filePath, {
         encoding: 'utf-8',
      });

      if (stringifiedPayload !== fileBlob) {
         writeFileSync(filePath, stringifiedPayload, {
            encoding: 'utf-8',
         });
         return true;
      }

      return false;
   }

   writeFileSync(filePath, stringifiedPayload, { encoding: 'utf-8' });
   return true;
};
