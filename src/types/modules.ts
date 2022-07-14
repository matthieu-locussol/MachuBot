import type { Command } from './commands';
import type { Component } from './components';
import type { ModalComponent } from './modals';

export interface Module {
   commands: Command[];
   components: Component[];
   modals: ModalComponent[];
}
