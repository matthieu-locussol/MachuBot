import type {
   ContextMenuCommandBuilder,
   SlashCommandBuilder,
   SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import type { CommandInteraction, ContextMenuCommandInteraction } from 'discord.js';
import type { Bot } from '../bot';

export type ChatInputCommand = {
   type: 'APPLICATION_COMMAND';
   data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
   execute: (interaction: CommandInteraction, bot: Bot) => Promise<void>;
};

export type ContextMenuCommand = {
   type: 'CONTEXT_MENU_COMMAND';
   data: ContextMenuCommandBuilder;
   execute: (interaction: ContextMenuCommandInteraction, bot: Bot) => Promise<void>;
};

export type Command = ChatInputCommand | ContextMenuCommand;
