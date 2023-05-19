import type { Module } from '../../types/modules';
import { musicCommand } from './commands/music';
import { playButton } from './components/playButton';
import { linksListener } from './listeners/links';

export const musicModule: Module = {
   commands: [musicCommand],
   components: [playButton],
   listeners: [linksListener],
   modals: [],
};
