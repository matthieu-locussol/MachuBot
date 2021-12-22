import type { ButtonComponent } from '../../../types/components';
import { recentButtonHandler } from './handlers/recentButtonHandler';
import { recentButtonComponent } from './ui/recentButtonComponent';

export const recentButton: ButtonComponent = {
   type: 'BUTTON',
   component: recentButtonComponent,
   execute: recentButtonHandler,
};
