import type { Module } from '../../types/modules';
import { diceCommand } from './commands/dice';
import { d12Button } from './components/d12Button';
import { d20Button } from './components/d20Button';
import { d6Button } from './components/d6Button';

export const diceModule: Module = {
   commands: [diceCommand],
   components: [d6Button, d12Button, d20Button],
   listeners: [],
   modals: [],
};
