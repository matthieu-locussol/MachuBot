import type { ButtonComponent } from '../../../types/components';
import { buttonModalHandler } from './handlers/buttonModalHandler';
import { buttonModalComponent } from './ui/buttonModalComponent';

export const buttonModal: ButtonComponent = {
   type: 'BUTTON',
   component: buttonModalComponent,
   execute: buttonModalHandler,
};
