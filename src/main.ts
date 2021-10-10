/* eslint-disable import/first */

import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env') });

import { Client, Intents } from 'discord.js';
import { _assert } from './utils/_assert';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
   _assert(client.user);
   console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
   if (!interaction.isCommand()) return;

   if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
   }
});

client.login(process.env.DISCORD_TOKEN_PRODUCTION);
