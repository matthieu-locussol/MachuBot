import { ButtonBuilder, ButtonStyle } from 'discord.js';

export const d12ButtonComponent = new ButtonBuilder({
   customId: 'd12Button',
   style: ButtonStyle.Success,
   label: 'Roll a d12',
});
