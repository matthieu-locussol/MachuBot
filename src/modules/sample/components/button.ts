import { ComponentType } from 'discord.js';
import type { ButtonComponent } from '../../../types/components';
import { buttonHandler } from './handlers/buttonHandler';
import { buttonComponent } from './ui/buttonComponent';

export const button: ButtonComponent = {
   type: ComponentType.Button,
   component: buttonComponent,
   execute: buttonHandler,
};
