import { ModalBuilder, ModalSubmitInteraction } from 'discord.js';
import type { Bot } from '../bot';

export type ModalComponentHandler = (
   interaction: ModalSubmitInteraction,
   bot: Bot,
) => Promise<void>;

export type ModalComponent = {
   component: ModalBuilder;
   execute: ModalComponentHandler;
};
