import { pingCommand } from './commands/ping';
import { Module } from '../../types';

export const pingModule: Module = {
   commands: [pingCommand],
};
