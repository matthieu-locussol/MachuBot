import { Message } from 'discord.js';
import type { Bot } from '../bot';

export type Listener = {
   execute: (message: Message, bot: Bot) => Promise<void>;
};
