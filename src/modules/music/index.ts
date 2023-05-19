import type { Module } from '../../types/modules';
import { musicCommand } from './commands/music';
import { pauseButton } from './components/pauseButton';
import { playButton } from './components/playButton';
import { stopButton } from './components/stopButton';
import { volumeDownButton } from './components/volumeDown';
import { volumeUpButton } from './components/volumeUp';
import { linksListener } from './listeners/links';

export const musicModule: Module = {
   commands: [musicCommand],
   components: [playButton, pauseButton, stopButton, volumeDownButton, volumeUpButton],
   listeners: [linksListener],
   modals: [],
};
