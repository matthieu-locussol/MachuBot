import { ComponentType } from 'discord.js';
import type { ButtonComponent } from '../../../types/components';
import { playButtonHandler } from './handlers/playButtonHandler';
import { playButtonComponent } from './ui/playButtonComponent';

export const playButton: ButtonComponent = {
   type: ComponentType.Button,
   component: playButtonComponent,
   execute: playButtonHandler,
};
