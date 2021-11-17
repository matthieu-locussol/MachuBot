import { MessageButton } from 'discord.js';
import { ButtonComponent } from '../../../types/components';

export const buttonSecondaryComponent: ButtonComponent = {
   type: 'BUTTON',
   component: new MessageButton({
      customId: 'buttonSecondary',
      style: 'SECONDARY',
      label: 'Secondary',
   }),
   execute: async (interaction) => {
      await interaction.update({
         content: 'Secondary clicked!',
         components: [],
      });
   },
};
