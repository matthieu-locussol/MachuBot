import { ButtonBuilder, ButtonStyle } from 'discord.js';

export const pauseButtonComponent = new ButtonBuilder({
   customId: 'PauseButton',
   style: ButtonStyle.Secondary,
   emoji: '<:pause:850790169883049985>',
});
