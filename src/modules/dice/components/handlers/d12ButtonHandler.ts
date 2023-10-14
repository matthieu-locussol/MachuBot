import type { ButtonComponentHandler } from '../../../../types/components';
import { roll } from '../../commands/roll';

export const d12ButtonHandler: ButtonComponentHandler = async (interaction) => {
   await roll(interaction, 'd12', 1);
};
