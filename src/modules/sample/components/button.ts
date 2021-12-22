import type { ButtonComponent } from '../../../types/components';
import { buttonHandler } from './handlers/buttonHandler';
import { buttonComponent } from './ui/buttonComponent';

export const button: ButtonComponent = {
   type: 'BUTTON',
   component: buttonComponent,
   execute: buttonHandler,
};
