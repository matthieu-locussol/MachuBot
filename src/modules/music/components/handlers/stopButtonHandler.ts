import type { ButtonComponentHandler } from '../../../../types/components';

export const stopButtonHandler: ButtonComponentHandler = async (interaction, bot) => {
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

   if (bot.getMusicPlayer().queues.has(interaction.guild.id)) {
      bot.getMusicPlayer().queues.get(interaction.guild.id)?.dispatcher?.disconnect();
   }
};
