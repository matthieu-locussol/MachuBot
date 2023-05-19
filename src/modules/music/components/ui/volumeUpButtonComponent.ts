import { ButtonBuilder, ButtonStyle } from 'discord.js';

export const volumeUpButtonComponent = new ButtonBuilder({
   customId: 'VolumeUpButton',
   style: ButtonStyle.Secondary,
   emoji: '<:plus:850790170088964187>',
});
