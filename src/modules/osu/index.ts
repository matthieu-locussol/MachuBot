import type { Module } from '../../types/modules';
import { osuCommand } from './commands/osu';
import { bestButton } from './components/bestButton';
import { recentButton } from './components/recentButton';

export const osuModule: Module = {
   commands: [osuCommand],
   components: [recentButton, bestButton],
};
