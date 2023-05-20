import type { ButtonComponentHandler } from '../../../../types/components';

export const pauseButtonHandler: ButtonComponentHandler = async (interaction, bot) => {
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
      bot.getMusicPlayer().queues.get(interaction.guild.id)?.dispatcher?.pause();
      await interaction.editReply('Paused.');
   } else {
      await interaction.editReply('No song is currently being played.');
   }
};
