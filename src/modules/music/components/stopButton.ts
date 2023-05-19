import { ComponentType } from 'discord.js';
import type { ButtonComponent } from '../../../types/components';
import { stopButtonHandler } from './handlers/stopButtonHandler';
import { stopButtonComponent } from './ui/stopButtonComponent';

export const stopButton: ButtonComponent = {
   type: ComponentType.Button,
   component: stopButtonComponent,
   execute: stopButtonHandler,
};
