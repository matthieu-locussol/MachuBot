import type { Module } from '../../types/modules';
import { sampleCommand } from './commands/sample';
import { sampleContextMessageCommand } from './commands/sampleContextMessage';
import { sampleContextUserCommand } from './commands/sampleContextUser';
import { buttonComponent } from './components/button';
import { buttonSecondaryComponent } from './components/buttonSecondary';
import { selectComponent } from './components/select';

export const sampleModule: Module = {
   commands: [sampleCommand, sampleContextMessageCommand, sampleContextUserCommand],
   components: [buttonComponent, buttonSecondaryComponent, selectComponent],
};
