import type {
   BaseMessageComponent,
   ButtonInteraction,
   MessageButton,
   MessageSelectMenu,
   SelectMenuInteraction,
} from 'discord.js';

type PartialComponent<T extends BaseMessageComponent> = {
   type: T['type'];
   component: T;
};

export type ButtonComponentHandler = (interaction: ButtonInteraction) => Promise<void>;

export type ButtonComponent = PartialComponent<MessageButton> & {
   execute: ButtonComponentHandler;
};

export type SelectMenuComponentHandler = (interaction: SelectMenuInteraction) => Promise<void>;

export type SelectMenuComponent = PartialComponent<MessageSelectMenu> & {
   execute: SelectMenuComponentHandler;
};

export type Component = ButtonComponent | SelectMenuComponent;
