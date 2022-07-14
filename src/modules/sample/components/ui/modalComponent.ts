import { MessageActionRow, Modal, TextInputComponent } from 'discord.js';

export const modalComponent = new Modal({
   customId: 'modal',
   title: 'Sample modal',
   components: [
      new MessageActionRow({
         components: [
            new TextInputComponent({
               customId: 'textInput',
               label: 'label',
               style: 'SHORT',
            }),
         ],
      }),
      new MessageActionRow({
         components: [
            new TextInputComponent({
               customId: 'textareaInput',
               label: 'label long',
               style: 'PARAGRAPH',
            }),
         ],
      }),
   ],
});
