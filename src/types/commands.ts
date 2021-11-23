import type {
   ContextMenuCommandBuilder,
   SlashCommandBuilder,
   SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import type {
   BaseCommandInteraction,
   CommandInteraction,
   ContextMenuInteraction,
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
