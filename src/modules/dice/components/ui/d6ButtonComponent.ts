import { ButtonBuilder, ButtonStyle } from 'discord.js';

export const d6ButtonComponent = new ButtonBuilder({
   customId: 'd6Button',
   style: ButtonStyle.Primary,
   label: 'Roll a d6',
});
