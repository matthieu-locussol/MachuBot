import { SlashCommandBuilder } from '@discordjs/builders';
import type { Interaction } from 'discord.js';

export interface Command {
   data: SlashCommandBuilder;
   execute: (interaction: Interaction) => Promise<void>;
}

export interface Module {
   commands: Command[];
}
