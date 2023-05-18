import { ButtonBuilder, ButtonStyle } from 'discord.js';

export const buttonModalComponent = new ButtonBuilder({
   customId: 'buttonModal',
   style: ButtonStyle.Primary,
   label: 'Button modal',
});
