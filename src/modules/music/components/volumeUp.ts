import { ComponentType } from 'discord.js';
import type { ButtonComponent } from '../../../types/components';
import { volumeUpButtonHandler } from './handlers/volumeUpButtonHandler';
import { volumeUpButtonComponent } from './ui/volumeUpButtonComponent';

export const volumeUpButton: ButtonComponent = {
   type: ComponentType.Button,
   component: volumeUpButtonComponent,
   execute: volumeUpButtonHandler,
};
