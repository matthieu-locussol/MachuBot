import { ButtonBuilder, ButtonStyle } from 'discord.js';

export const volumeDownButtonComponent = new ButtonBuilder({
   customId: 'VolumeDownButton',
   style: ButtonStyle.Secondary,
   emoji: '<:minus:850790170063798322>',
});
