import { ModalComponent } from '../../../types/modals';
import { modalHandler } from './handlers/modalHandler';
import { modalComponent } from './ui/modalComponent';

export const modal: ModalComponent = {
   component: modalComponent,
   execute: modalHandler,
};
