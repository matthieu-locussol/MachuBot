import { Command } from './commands';
import { Component } from './components';

export interface Module {
   commands: Command[];
   components: Component[];
}
