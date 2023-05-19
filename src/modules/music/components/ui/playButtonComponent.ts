import { ButtonBuilder, ButtonStyle } from 'discord.js';

export const playButtonComponent = new ButtonBuilder({
   customId: 'PlayButton',
   style: ButtonStyle.Secondary,
   emoji: '<:play:850790170051870770>',
});
