import type { Module } from '../../types/modules';
import { sampleCommand } from './commands/sample';
import { sampleContextMessageCommand } from './commands/sampleContextMessage';
import { sampleContextUserCommand } from './commands/sampleContextUser';

export const sampleModule: Module = {
   commands: [sampleCommand, sampleContextMessageCommand, sampleContextUserCommand],
};
