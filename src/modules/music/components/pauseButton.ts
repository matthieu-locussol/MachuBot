import { ComponentType } from 'discord.js';
import type { ButtonComponent } from '../../../types/components';
import { pauseButtonHandler } from './handlers/pauseButtonHandler';
import { pauseButtonComponent } from './ui/pauseButtonComponent';

export const pauseButton: ButtonComponent = {
   type: ComponentType.Button,
   component: pauseButtonComponent,
   execute: pauseButtonHandler,
};
