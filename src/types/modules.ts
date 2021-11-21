import type { Command } from './commands';
import type { Component } from './components';

export interface Module {
   commands: Command[];
   components: Component[];
}
