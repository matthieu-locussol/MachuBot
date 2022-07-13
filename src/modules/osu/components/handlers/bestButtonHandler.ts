import type { ButtonComponentHandler } from '../../../../types/components';
import { osuBest } from '../../commands/subcommands/osuBest';

export const bestButtonHandler: ButtonComponentHandler = async (interaction) => {
   await osuBest(interaction, null);
};
