import { ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { Listener } from '../../../types/listeners';
import { isYoutubeUrl } from '../../../utils/string';
import { playButton } from '../components/playButton';

export const linksListener: Listener = {
   execute: async (message) => {
      if (isYoutubeUrl(message.content)) {
         await message.delete();
         await message.channel.send({
            content: `Video sent by ${message.author.username}: ${message.content}`,
            components: [
               new ActionRowBuilder<ButtonBuilder>({
                  components: [playButton.component],
               }),
            ],
         });
      }
   },
};
