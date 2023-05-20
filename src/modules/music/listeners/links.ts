import { ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { Listener } from '../../../types/listeners';
import { isYoutubeUrl } from '../../../utils/string';
import { pauseButton } from '../components/pauseButton';
import { playButton } from '../components/playButton';
import { stopButton } from '../components/stopButton';
import { volumeDownButton } from '../components/volumeDown';
import { volumeUpButton } from '../components/volumeUp';

export const linksListener: Listener = {
   execute: async (message) => {
      if (process.env.NODE_ENV === 'production') {
         if (message.channel.id === process.env.DISCORD_DEVELOPMENT_CHANNEL_ID) {
            return;
         }
      }

      if (isYoutubeUrl(message.content)) {
         await message.delete();
         await message.channel.send({
            content: `Video sent by ${message.author.username}: ${message.content}`,
            components: [
               new ActionRowBuilder<ButtonBuilder>({
                  components: [
                     playButton.component,
                     pauseButton.component,
                     stopButton.component,
                     volumeDownButton.component,
                     volumeUpButton.component,
                  ],
               }),
            ],
         });
      }
   },
};
