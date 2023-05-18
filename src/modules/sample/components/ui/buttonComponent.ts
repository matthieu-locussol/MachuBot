import { ButtonBuilder, ButtonStyle } from 'discord.js';

export const buttonComponent = new ButtonBuilder({
   customId: 'button',
   style: ButtonStyle.Primary,
   label: 'Button',
});
