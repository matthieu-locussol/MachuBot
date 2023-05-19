import { VoiceConnectionStatus } from '@discordjs/voice';
import type { ButtonComponentHandler } from '../../../../types/components';
import { _assert } from '../../../../utils/_assert';
import { loadGuildDatabase } from '../../../../utils/database';
import { extractYoutubeLink } from '../../../../utils/string';

export const playButtonHandler: ButtonComponentHandler = async (interaction, bot) => {
   await interaction.deferReply();

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
      : bot.getMusicPlayer().queues.create(interaction.guild.id, { volume: database.music.volume });
   _assert(queue);

   if (
      queue.connection?.state.status === VoiceConnectionStatus.Ready &&
      queue.dispatcher?.isPaused
   ) {
      queue.dispatcher?.resume();
      await interaction.editReply('Resuming...');
   } else {
      queue.player.play(member.voice.channel, extractYoutubeLink(interaction.message.content), {
         nodeOptions: {
            metadata: interaction,
         },
      });

      await interaction.editReply('Playing...');
   }
};
