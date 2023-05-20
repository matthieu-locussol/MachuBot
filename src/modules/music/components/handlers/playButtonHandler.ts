import { VoiceConnectionStatus } from '@discordjs/voice';
import { GuildQueuePlayerNode, QueryType } from 'discord-player';
import type { ButtonComponentHandler } from '../../../../types/components';
import { _assert } from '../../../../utils/_assert';
import { loadGuildDatabase } from '../../../../utils/database';
import { extractYoutubeLink } from '../../../../utils/string';

export const playButtonHandler: ButtonComponentHandler = async (interaction, bot) => {
   await interaction.deferReply({ ephemeral: true });

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
      interaction.editReply('You must be in a voice channel to use this command.');
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
      if (url !== database.music.currentUrl) {
         const searchResult = await queue.player.search(url, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
         });

         queuePlayerNode.insert(searchResult.tracks[0]);
         queuePlayerNode.skip();

         if (queue.dispatcher?.isPaused) {
            queue.dispatcher?.resume();
         }

         database.music.currentUrl = url;
         await database.save();

         await interaction.editReply('Playing...');
      } else if (queue.dispatcher?.isPaused) {
         queue.dispatcher?.resume();
         await interaction.editReply('Resuming...');
      }
   } else {
      database.music.currentUrl = url;
      await database.save();

      queue.player.play(member.voice.channel, url);

      await interaction.editReply('Playing...');
   }
};
