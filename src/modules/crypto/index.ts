import type { Module } from '../../types/modules';
import { cryptoCommand } from './commands/crypto';

export const cryptoModule: Module = {
   commands: [cryptoCommand],
   components: [],
   listeners: [],
   modals: [],
};
