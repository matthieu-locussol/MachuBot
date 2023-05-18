import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

const shortInput = new TextInputBuilder({
   customId: 'shortInput',
   label: 'Short input',
   style: TextInputStyle.Short,
});

const paragraphInput = new TextInputBuilder({
   customId: 'paragraphInput',
   label: 'Paragraph input',
   style: TextInputStyle.Paragraph,
});

export const modalComponent = new ModalBuilder({
   customId: 'modal',
   title: 'Sample modal',
   components: [
      new ActionRowBuilder<TextInputBuilder>({ components: [shortInput] }),
      new ActionRowBuilder<TextInputBuilder>({ components: [paragraphInput] }),
   ],
});
