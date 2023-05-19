import { Listener } from '../../../types/listeners';
import { isYoutubeUrl } from '../../../utils/string';

export const linksListener: Listener = {
   execute: async (message) => {
      if (isYoutubeUrl(message.content)) {
         await message.react('🎵');
      }
   },
};
