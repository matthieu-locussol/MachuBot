import { ComponentType } from 'discord.js';
import type { ButtonComponent } from '../../../types/components';
import { recentButtonHandler } from './handlers/recentButtonHandler';
import { recentButtonComponent } from './ui/recentButtonComponent';

export const recentButton: ButtonComponent = {
   type: ComponentType.Button,
   component: recentButtonComponent,
   execute: recentButtonHandler,
};
