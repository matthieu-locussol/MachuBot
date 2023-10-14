import { ComponentType } from 'discord.js';
import type { ButtonComponent } from '../../../types/components';
import { d20ButtonHandler } from './handlers/d20ButtonHandler';
import { d20ButtonComponent } from './ui/d20ButtonComponent';

export const d20Button: ButtonComponent = {
   type: ComponentType.Button,
   component: d20ButtonComponent,
   execute: d20ButtonHandler,
};
