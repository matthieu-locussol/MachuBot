import type { ButtonComponent } from '../../../types/components';
import { bestButtonHandler } from './handlers/bestButtonHandler';
import { bestButtonComponent } from './ui/bestButtonComponent';

export const bestButton: ButtonComponent = {
   type: 'BUTTON',
   component: bestButtonComponent,
   execute: bestButtonHandler,
};
