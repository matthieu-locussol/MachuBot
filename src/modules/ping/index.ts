import type { Module } from '../../types';
import { pingCommand } from './commands/ping';

export const pingModule: Module = {
   commands: [pingCommand],
};
