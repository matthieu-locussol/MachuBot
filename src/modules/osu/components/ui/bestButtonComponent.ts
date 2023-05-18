import { ButtonBuilder, ButtonStyle } from 'discord.js';

export const bestButtonComponent = new ButtonBuilder({
   customId: 'BestButton',
   style: ButtonStyle.Primary,
   label: 'See my best plays',
});
