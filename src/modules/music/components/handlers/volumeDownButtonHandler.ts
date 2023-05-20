import type { ButtonComponentHandler } from '../../../../types/components';
import { loadGuildDatabase } from '../../../../utils/database';
import { clamp } from '../../../../utils/number';

export const volumeDownButtonHandler: ButtonComponentHandler = async (interaction, bot) => {
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

   if (bot.getMusicPlayer().queues.has(interaction.guild.id)) {
      const database = await loadGuildDatabase(interaction.guild.id);
      const currentVolume = database.music.volume;
      const newVolume = clamp(currentVolume - 10, 0, 100);

      database.music.volume = newVolume;
      await database.save();

      bot.getMusicPlayer().queues.get(interaction.guild.id)?.dispatcher?.setVolume(newVolume);

      await interaction.editReply(`Volume set to ${newVolume}.`);
   } else {
      await interaction.editReply('No song is currently being played.');
   }
};
