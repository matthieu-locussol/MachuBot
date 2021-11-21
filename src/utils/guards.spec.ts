import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageButton } from 'discord.js';
import type { Command } from '../types/commands';
import type { Component } from '../types/components';
import { commandsUnicityGuard, componentsUnicityGuard } from './guards';

const mockComponent = (customId: string): Component => ({
   type: 'BUTTON',
   component: new MessageButton({
      customId,
      style: 'PRIMARY',
      label: 'Button',
   }),
   execute: async () => undefined,
});

const mockCommand = (name: string): Command => ({
   type: 'APPLICATION_COMMAND',
   data: new SlashCommandBuilder().setName(name),
   execute: async () => undefined,
});

describe(__filename, () => {
   test('componentsUnicityGuard', async () => {
      const componentA = mockComponent('idA');
      const componentB = mockComponent('idB');

      const validSample: Component[] = [componentA, componentB];
      const invalidSample: Component[] = [componentA, componentB, componentA];

      expect(() => componentsUnicityGuard([])).not.toThrow();
      expect(() => componentsUnicityGuard(validSample)).not.toThrow();
      expect(() => componentsUnicityGuard(invalidSample)).toThrow();
   });

   test('commandsUnicityGuard', async () => {
      const commandA = mockCommand('name_a');
      const commandB = mockCommand('name_b');

      const validSample: Command[] = [commandA, commandB];
      const invalidSample: Command[] = [commandA, commandB, commandA];

      expect(() => commandsUnicityGuard([])).not.toThrow();
      expect(() => commandsUnicityGuard(validSample)).not.toThrow();
      expect(() => commandsUnicityGuard(invalidSample)).toThrow();
   });
});
