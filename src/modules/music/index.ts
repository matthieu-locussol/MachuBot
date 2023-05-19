import type { Module } from '../../types/modules';
import { musicCommand } from './commands/music';
import { linksListener } from './listeners/links';

export const musicModule: Module = {
   commands: [musicCommand],
   components: [],
   listeners: [linksListener],
   modals: [],
};
