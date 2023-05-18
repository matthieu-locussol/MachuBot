import type {
   ContextMenuCommandBuilder,
   SlashCommandBuilder,
   SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import type { CommandInteraction, ContextMenuCommandInteraction } from 'discord.js';

export type ChatInputCommand = {
   type: 'APPLICATION_COMMAND';
   data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
   execute: (interaction: CommandInteraction) => Promise<void>;
};

export type ContextMenuCommand = {
   type: 'CONTEXT_MENU_COMMAND';
   data: ContextMenuCommandBuilder;
   execute: (interaction: ContextMenuCommandInteraction) => Promise<void>;
};

export type Command = ChatInputCommand | ContextMenuCommand;
