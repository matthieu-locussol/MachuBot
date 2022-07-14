import type { ButtonComponentHandler } from '../../../../types/components';
import { modalComponent } from '../ui/modalComponent';

export const buttonModalHandler: ButtonComponentHandler = async (interaction) => {
   await interaction.showModal(modalComponent);
};
