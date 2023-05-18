import { ButtonBuilder, ButtonStyle } from 'discord.js';

export const recentButtonComponent = new ButtonBuilder({
   customId: 'RecentButton',
   style: ButtonStyle.Primary,
   label: 'See my recent play',
});
