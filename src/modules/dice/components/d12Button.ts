import { ComponentType } from 'discord.js';
import type { ButtonComponent } from '../../../types/components';
import { d12ButtonHandler } from './handlers/d12ButtonHandler';
import { d12ButtonComponent } from './ui/d12ButtonComponent';

export const d12Button: ButtonComponent = {
   type: ComponentType.Button,
   component: d12ButtonComponent,
   execute: d12ButtonHandler,
};
