import { ComponentType } from 'discord.js';
import type { ButtonComponent } from '../../../types/components';
import { d6ButtonHandler } from './handlers/d6ButtonHandler';
import { d6ButtonComponent } from './ui/d6ButtonComponent';

export const d6Button: ButtonComponent = {
   type: ComponentType.Button,
   component: d6ButtonComponent,
   execute: d6ButtonHandler,
};
