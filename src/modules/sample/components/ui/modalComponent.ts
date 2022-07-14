import { MessageActionRow, Modal, TextInputComponent } from 'discord.js';

const shortInput = new TextInputComponent({
   customId: 'shortInput',
   label: 'Short input',
   style: 'SHORT',
});

const paragraphInput = new TextInputComponent({
   customId: 'paragraphInput',
   label: 'Paragraph input',
   style: 'PARAGRAPH',
});

export const modalComponent = new Modal({
   customId: 'modal',
   title: 'Sample modal',
   components: [
      new MessageActionRow({ components: [shortInput] }),
      new MessageActionRow({ components: [paragraphInput] }),
   ],
});
