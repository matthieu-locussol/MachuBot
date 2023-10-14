import type { ButtonComponentHandler } from '../../../../types/components';
import { roll } from '../../commands/roll';

export const d6ButtonHandler: ButtonComponentHandler = async (interaction) => {
   await roll(interaction, 'd6', 1);
};
