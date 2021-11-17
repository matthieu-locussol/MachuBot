import { MessageButton } from 'discord.js';
import { ButtonComponent } from '../../../types/components';

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
