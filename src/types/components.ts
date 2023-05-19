import type {
   ButtonBuilder,
   ButtonInteraction,
   ComponentType,
   StringSelectMenuBuilder,
   StringSelectMenuInteraction,
} from 'discord.js';
import type { Bot } from '../bot';

export type ButtonComponentHandler = (interaction: ButtonInteraction, bot: Bot) => Promise<void>;

export type ButtonComponent = {
   type: ComponentType.Button;
   component: ButtonBuilder;
   execute: ButtonComponentHandler;
};

export type SelectMenuComponentHandler = (
   interaction: StringSelectMenuInteraction,
   bot: Bot,
) => Promise<void>;

export type SelectMenuComponent = {
   type: ComponentType.SelectMenu;
   component: StringSelectMenuBuilder;
   execute: SelectMenuComponentHandler;
};

export type Component = ButtonComponent | SelectMenuComponent;
