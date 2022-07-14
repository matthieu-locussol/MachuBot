import { Modal, ModalSubmitInteraction } from 'discord.js';

export type ModalComponentHandler = (interaction: ModalSubmitInteraction) => Promise<void>;

export type ModalComponent = {
   component: Modal;
   execute: ModalComponentHandler;
};
