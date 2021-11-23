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

export type ButtonComponent = PartialComponent<MessageButton> & {
   execute: (interaction: ButtonInteraction) => Promise<void>;
};

export type SelectMenuComponent = PartialComponent<MessageSelectMenu> & {
   execute: (interaction: SelectMenuInteraction) => Promise<void>;
};

export type Component = ButtonComponent | SelectMenuComponent;
