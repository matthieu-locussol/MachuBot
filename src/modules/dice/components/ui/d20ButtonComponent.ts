import { ButtonBuilder, ButtonStyle } from 'discord.js';

export const d20ButtonComponent = new ButtonBuilder({
   customId: 'd20Button',
   style: ButtonStyle.Secondary,
   label: 'Roll a d20',
});
