import { ModalBuilder, ModalSubmitInteraction } from 'discord.js';

export type ModalComponentHandler = (interaction: ModalSubmitInteraction) => Promise<void>;

export type ModalComponent = {
   component: ModalBuilder;
   execute: ModalComponentHandler;
};
