import { MessageButton } from 'discord.js';
import type { ButtonComponent } from '../../../types/components';

export const buttonComponent: ButtonComponent = {
   type: 'BUTTON',
   component: new MessageButton({
      customId: 'button',
      style: 'PRIMARY',
      label: 'Button',
   }),
   execute: async (interaction) => {
      await interaction.update({
         content: 'Button clicked!',
         components: [],
      });
   },
};
