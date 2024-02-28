import { VoiceConnectionStatus } from '@discordjs/voice';
import { GuildQueuePlayerNode, QueryType } from 'discord-player';
import type { ButtonComponentHandler } from '../../../../types/components';
import { _assert } from '../../../../utils/_assert';
import { loadGuildDatabase } from '../../../../utils/database';
import { extractYoutubeLink } from '../../../../utils/string';

export const playButtonHandler: ButtonComponentHandler = async (interaction, bot) => {
   await interaction.deferUpdate();

   if (interaction.guild === null) {
      return;
   }

   const member = interaction.guild.members.cache.find(({ id }) => {
      if (interaction.member) {
         return id === interaction.member.user.id;
      }

      return undefined;
   });

   if (member === undefined || member.voice.channel === null) {
      return;
   }

   const database = await loadGuildDatabase(interaction.guild.id);

   const queue = bot.getMusicPlayer().queues.has(interaction.guild.id)
      ? bot.getMusicPlayer().queues.get(interaction.guild.id)
      : bot.getMusicPlayer().queues.create(interaction.guild.id, {
           metadata: interaction,
           volume: database.music.volume,
           leaveOnEnd: false,
           leaveOnEmpty: false,
           leaveOnStop: false,
        });
   _assert(queue);

   const queuePlayerNode = new GuildQueuePlayerNode(queue);
   const url = extractYoutubeLink(interaction.message.content);

   if (queue.connection?.state.status === VoiceConnectionStatus.Ready) {
      if (url === queuePlayerNode.queue.currentTrack?.url && queuePlayerNode.isPaused()) {
         queuePlayerNode.resume();
      } else {
         const searchResult = await queue.player.search(url, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
         });

         if (queuePlayerNode.isIdle()) {
            queue.player.play(member.voice.channel, url, {
               nodeOptions: {
                  metadata: interaction,
                  leaveOnEnd: false,
                  leaveOnEmpty: true,
                  leaveOnEmptyCooldown: 5000,
                  leaveOnStop: false,
               },
            });
         } else {
            queuePlayerNode.insert(searchResult.tracks[0]);
            queuePlayerNode.skip();
         }

         if (queuePlayerNode.isPaused()) {
            queuePlayerNode.resume();
         }
      }
   } else {
      queue.player.play(member.voice.channel, url, {
         nodeOptions: {
            metadata: interaction,
            leaveOnEnd: false,
            leaveOnEmpty: true,
            leaveOnEmptyCooldown: 5000,
            leaveOnStop: false,
         },
      });
   }
};
