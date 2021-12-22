import type { ButtonComponentHandler } from '../../../../types/components';
import { osuRecent } from '../../commands/subcommands/osuRecent';

export const recentButtonHandler: ButtonComponentHandler = async (interaction) => {
   await osuRecent(interaction, null, null);
};
