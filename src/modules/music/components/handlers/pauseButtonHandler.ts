import { GuildQueuePlayerNode } from 'discord-player';
import type { ButtonComponentHandler } from '../../../../types/components';
import { _assert } from '../../../../utils/_assert';

export const pauseButtonHandler: ButtonComponentHandler = async (interaction, bot) => {
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
      const queue = bot.getMusicPlayer().queues.get(interaction.guild.id);
      _assert(queue);

      const queuePlayerNode = new GuildQueuePlayerNode(queue);
      queuePlayerNode.pause();
   }
};
