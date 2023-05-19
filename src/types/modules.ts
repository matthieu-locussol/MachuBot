import type { Command } from './commands';
import type { Component } from './components';
import { Listener } from './listeners';
import type { ModalComponent } from './modals';

export interface Module {
   commands: Command[];
   components: Component[];
   listeners: Listener[];
   modals: ModalComponent[];
}
