import type { ButtonComponentHandler } from '../../../../types/components';
import { roll } from '../../commands/roll';

export const d20ButtonHandler: ButtonComponentHandler = async (interaction) => {
   await roll(interaction, 'd20', 1);
};
