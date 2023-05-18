import { ComponentType } from 'discord.js';
import type { SelectMenuComponent } from '../../../types/components';
import { selectHandler } from './handlers/selectHandler';
import { selectComponent } from './ui/selectComponent';

export const select: SelectMenuComponent = {
   type: ComponentType.StringSelect,
   component: selectComponent,
   execute: selectHandler,
};
