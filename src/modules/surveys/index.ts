import type { Module } from '../../types/modules';
import { surveysCommand } from './commands/surveys';

export const surveysModule: Module = {
   commands: [surveysCommand],
   components: [],
   listeners: [],
   modals: [],
};
