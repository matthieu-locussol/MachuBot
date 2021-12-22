import { MessageSelectMenu } from 'discord.js';

export const selectComponent = new MessageSelectMenu({
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
   .setMaxValues(3);
