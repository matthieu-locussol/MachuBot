import { ButtonBuilder, ButtonStyle } from 'discord.js';

export const buttonSecondaryComponent = new ButtonBuilder({
   customId: 'buttonSecondary',
   style: ButtonStyle.Secondary,
   label: 'Secondary',
});
