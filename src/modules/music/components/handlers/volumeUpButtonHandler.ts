import { GuildQueuePlayerNode } from 'discord-player';
import type { ButtonComponentHandler } from '../../../../types/components';
import { _assert } from '../../../../utils/_assert';
import { loadGuildDatabase } from '../../../../utils/database';
import { clamp } from '../../../../utils/number';

export const volumeUpButtonHandler: ButtonComponentHandler = async (interaction, bot) => {
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
      return;
   }

   if (bot.getMusicPlayer().queues.has(interaction.guild.id)) {
      const database = await loadGuildDatabase(interaction.guild.id);
      const currentVolume = database.music.volume;
      const newVolume = clamp(currentVolume + 10, 0, 100);
      database.music.volume = newVolume;

      const queue = bot.getMusicPlayer().queues.get(interaction.guild.id);
      _assert(queue);

      const queuePlayerNode = new GuildQueuePlayerNode(queue);
      queuePlayerNode.setVolume(newVolume);

      await Promise.all([database.save(), interaction.editReply(`Volume set to ${newVolume}%.`)]);
   }
};
