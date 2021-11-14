import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import type {
   ButtonInteraction,
   CommandInteraction,
   MessageButton,
   MessageSelectMenu,
   SelectMenuInteraction,
} from 'discord.js';

export interface Command {
   data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
   execute: (interaction: CommandInteraction) => Promise<void>;
}

export interface ButtonComponent {
   type: MessageButton['type'];
   component: MessageButton;
   execute: (interaction: ButtonInteraction) => Promise<void>;
}

export interface SelectMenuComponent {
   type: MessageSelectMenu['type'];
   component: MessageSelectMenu;
   execute: (interaction: SelectMenuInteraction) => Promise<void>;
}

export type Component = ButtonComponent | SelectMenuComponent;

export interface Module {
   commands: Command[];
}
