import type { SelectMenuComponent } from '../../../types/components';
import { selectHandler } from './handlers/selectHandler';
import { selectComponent } from './ui/selectComponent';

export const select: SelectMenuComponent = {
   type: 'SELECT_MENU',
   component: selectComponent,
   execute: selectHandler,
};
