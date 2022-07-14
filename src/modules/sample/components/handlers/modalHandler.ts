import { ModalComponentHandler } from '../../../../types/modals';

export const modalHandler: ModalComponentHandler = async (interaction) => {
   interaction.reply('Modal submitted!');
};
