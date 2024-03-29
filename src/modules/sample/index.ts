import type { Module } from '../../types/modules';
import { sampleCommand } from './commands/sample';
import { sampleContextMessageCommand } from './commands/sampleContextMessage';
import { sampleContextUserCommand } from './commands/sampleContextUser';
import { button } from './components/button';
import { buttonModal } from './components/buttonModal';
import { buttonSecondary } from './components/buttonSecondary';
import { modal } from './components/modal';
import { select } from './components/select';

export const sampleModule: Module = {
   commands: [sampleCommand, sampleContextMessageCommand, sampleContextUserCommand],
   components: [button, buttonSecondary, select, buttonModal],
   listeners: [],
   modals: [modal],
};
