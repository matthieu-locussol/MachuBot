import { ComponentType } from 'discord.js';
import type { ButtonComponent } from '../../../types/components';
import { buttonModalHandler } from './handlers/buttonModalHandler';
import { buttonModalComponent } from './ui/buttonModalComponent';

export const buttonModal: ButtonComponent = {
   type: ComponentType.Button,
   component: buttonModalComponent,
   execute: buttonModalHandler,
};
