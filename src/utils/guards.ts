import { ContextMenuCommandType } from '@discordjs/builders';
import { ApplicationCommandType } from 'discord-api-types/v9';
import { logger } from '../logger';
import type { Command } from '../types/commands';
import type { Component } from '../types/components';
import { isUnique } from './array';
import { _assertTrue } from './_assert';

const MAX_CHAT_INPUT_COMMANDS = 100;

const MAX_CONTEXT_MENU_USER_COMMANDS = 5;

const MAX_CONTEXT_MENU_MESSAGE_COMMANDS = 5;

export const componentsUnicityGuard = (components: Component[]): void => {
   _assertTrue(
      isUnique(components.map((entry) => entry.component.customId)),
      'Components names are not unique!',
   );
};

export const commandsUnicityGuard = (commands: Command[]): void => {
   _assertTrue(
      isUnique(commands.map((entry) => entry.data.name)),
      'Commands names are not unique!',
   );
};

export const chatInputCommandsGuard = (commands: Command[]): void => {
   const chatInputCommandsCount = commands.filter(
      (entry) => entry.type === 'APPLICATION_COMMAND',
   ).length;

   _assertTrue(
      chatInputCommandsCount <= MAX_CHAT_INPUT_COMMANDS,
      `Impossible to register more than ${MAX_CHAT_INPUT_COMMANDS} ChatInput commands!`,
   );

   logger.info(
      `${chatInputCommandsCount}/${MAX_CHAT_INPUT_COMMANDS} ChatInput commands registered!`,
   );
};

export const contextMenuUserCommandsGuard = (commands: Command[]): void => {
   const contextMenuUserCommandsCount = commands.filter(
      (entry) =>
         entry.type === 'CONTEXT_MENU_COMMAND' &&
         entry.data.type === (ApplicationCommandType.User as unknown as ContextMenuCommandType),
   ).length;

   _assertTrue(
      contextMenuUserCommandsCount <= MAX_CONTEXT_MENU_USER_COMMANDS,
      `Impossible to register more than ${MAX_CONTEXT_MENU_USER_COMMANDS} ContextMenu (User) commands!`,
   );

   logger.info(
      `${contextMenuUserCommandsCount}/${MAX_CONTEXT_MENU_USER_COMMANDS} ContextMenu (User) commands registered!`,
   );
};

export const contextMenuMessageCommandsGuard = (commands: Command[]): void => {
   const contextMenuMessageCommandsCount = commands.filter(
      (entry) =>
         entry.type === 'CONTEXT_MENU_COMMAND' &&
         entry.data.type === (ApplicationCommandType.Message as unknown as ContextMenuCommandType),
   ).length;

   _assertTrue(
      contextMenuMessageCommandsCount <= MAX_CONTEXT_MENU_MESSAGE_COMMANDS,
      `Impossible to register more than ${MAX_CONTEXT_MENU_MESSAGE_COMMANDS} ContextMenu (Message) commands!`,
   );

   logger.info(
      `${contextMenuMessageCommandsCount}/${MAX_CONTEXT_MENU_MESSAGE_COMMANDS} ContextMenu (Message) commands registered!`,
   );
};
