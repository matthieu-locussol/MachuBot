import type { Module } from '../../types/modules';
import { osuCommand } from './commands/osu';

export const osuModule: Module = {
   commands: [osuCommand],
   components: [],
};
