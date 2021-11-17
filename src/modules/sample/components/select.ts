import { MessageSelectMenu } from 'discord.js';
import { SelectMenuComponent } from '../../../types/components';

export const selectComponent: SelectMenuComponent = {
   type: 'SELECT_MENU',
   component: new MessageSelectMenu({
      customId: 'select',
   })
      .addOptions([
         {
            label: 'A',
            value: 'a',
         },
         {
            label: 'B',
            value: 'b',
         },
         {
            label: 'C',
            value: 'c',
         },
         {
            label: 'D',
            value: 'd',
         },
      ])
      .setPlaceholder('Nothing selected')
      .setMinValues(2)
      .setMaxValues(3),
   execute: async (interaction) => {
      await interaction.update({
         content: `Options selected: ${interaction.values.join(', ')}`,
         components: [],
      });
   },
};
