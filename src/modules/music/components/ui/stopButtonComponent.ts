import { ButtonBuilder, ButtonStyle } from 'discord.js';

export const stopButtonComponent = new ButtonBuilder({
   customId: 'StopButton',
   style: ButtonStyle.Secondary,
   emoji: '<:stop:850790170226851880>',
});
