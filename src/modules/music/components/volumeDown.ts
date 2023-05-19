import { ComponentType } from 'discord.js';
import type { ButtonComponent } from '../../../types/components';
import { volumeDownButtonHandler } from './handlers/volumeDownButtonHandler';
import { volumeDownButtonComponent } from './ui/volumeDownButtonComponent';

export const volumeDownButton: ButtonComponent = {
   type: ComponentType.Button,
   component: volumeDownButtonComponent,
   execute: volumeDownButtonHandler,
};
