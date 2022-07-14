import { ModalComponentHandler } from '../../../../types/modals';

export const modalHandler: ModalComponentHandler = async (interaction) => {
   const shortInputContent = interaction.fields.getTextInputValue('shortInput');
   const paragraphInputContent = interaction.fields.getTextInputValue('paragraphInput');

   interaction.reply({
      content: [
         'Modal submitted!',
         `Short input content: \`${shortInputContent}\``,
         `Paragraph input content: \`${paragraphInputContent}\``,
      ].join('\n'),
   });
};
