import type { Module } from '../../types/modules';
import { pingCommand } from './commands/ping';

export const pingModule: Module = {
   commands: [pingCommand],
   components: [],
   listeners: [],
   modals: [],
};
