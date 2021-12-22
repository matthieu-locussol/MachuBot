import type { Module } from '../../types/modules';
import { osuCommand } from './commands/osu';
import { recentButton } from './components/recentButton';

export const osuModule: Module = {
   commands: [osuCommand],
   components: [recentButton],
};
