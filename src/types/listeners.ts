import { Message } from 'discord.js';

export type Listener = {
   execute: (message: Message) => Promise<void>;
};
