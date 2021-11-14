import type { Module } from '../../types';
import { sampleCommand } from './commands/sample';

export const sampleModule: Module = {
   commands: [sampleCommand],
};
