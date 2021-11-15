import {
   ContextMenuCommandBuilder,
   SlashCommandBuilder,
   SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import type {
   BaseCommandInteraction,
   BaseMessageComponent,
   ButtonInteraction,
   CommandInteraction,
   ContextMenuInteraction,
   MessageButton,
   MessageSelectMenu,
   SelectMenuInteraction,
} from 'discord.js';

type PartialCommand<T extends BaseCommandInteraction> = {
   type: 'APPLICATION_COMMAND' | 'CONTEXT_MENU_COMMAND';
   execute: (interaction: T) => Promise<void>;
};

export type ChatInputCommand = PartialCommand<CommandInteraction> & {
   type: 'APPLICATION_COMMAND';
   data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
};

export type ContextMenuCommand = PartialCommand<ContextMenuInteraction> & {
   type: 'CONTEXT_MENU_COMMAND';
   data: ContextMenuCommandBuilder;
};

export type Command = ChatInputCommand | ContextMenuCommand;

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

export interface Module {
   commands: Command[];
}
