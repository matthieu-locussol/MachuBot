import { ApplicationCommandType } from 'discord-api-types/payloads/v9';
import { log } from '../logger';
import { Command } from '../types/commands';
import { isUnique } from './array';
import { _assertTrue } from './_assert';

const MAX_CHAT_INPUT_COMMANDS = 100;

const MAX_CONTEXT_MENU_USER_COMMANDS = 5;

const MAX_CONTEXT_MENU_MESSAGE_COMMANDS = 5;

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

   log(`${chatInputCommandsCount}/${MAX_CHAT_INPUT_COMMANDS} ChatInput commands registered!`);
};

export const contextMenuUserCommandsGuard = (commands: Command[]): void => {
   const contextMenuUserCommandsCount = commands.filter(
      (entry) =>
         entry.type === 'CONTEXT_MENU_COMMAND' && entry.data.type === ApplicationCommandType.User,
   ).length;

   _assertTrue(
      contextMenuUserCommandsCount <= MAX_CONTEXT_MENU_USER_COMMANDS,
      `Impossible to register more than ${MAX_CONTEXT_MENU_USER_COMMANDS} ContextMenu (User) commands!`,
   );

   log(
      `${contextMenuUserCommandsCount}/${MAX_CONTEXT_MENU_USER_COMMANDS} ContextMenu (User) commands registered!`,
   );
};

export const contextMenuMessageCommandsGuard = (commands: Command[]): void => {
   const contextMenuMessageCommandsCount = commands.filter(
      (entry) =>
         entry.type === 'CONTEXT_MENU_COMMAND' &&
         entry.data.type === ApplicationCommandType.Message,
   ).length;

   _assertTrue(
      contextMenuMessageCommandsCount <= MAX_CONTEXT_MENU_MESSAGE_COMMANDS,
      `Impossible to register more than ${MAX_CONTEXT_MENU_MESSAGE_COMMANDS} ContextMenu (Message) commands!`,
   );

   log(
      `${contextMenuMessageCommandsCount}/${MAX_CONTEXT_MENU_MESSAGE_COMMANDS} ContextMenu (Message) commands registered!`,
   );
};
