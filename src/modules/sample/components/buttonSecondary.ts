import { ComponentType } from 'discord.js';
import type { ButtonComponent } from '../../../types/components';
import { buttonSecondaryHandler } from './handlers/buttonSecondaryHandler';
import { buttonSecondaryComponent } from './ui/buttonSecondaryComponent';

export const buttonSecondary: ButtonComponent = {
   type: ComponentType.Button,
   component: buttonSecondaryComponent,
   execute: buttonSecondaryHandler,
};
