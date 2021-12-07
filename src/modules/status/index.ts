import type { Module } from '../../types/modules';
import { statusCommand } from './commands/status';

export const statusModule: Module = {
   commands: [statusCommand],
   components: [],
};
