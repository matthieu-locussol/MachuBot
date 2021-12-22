import { MessageButton } from 'discord.js';

export const recentButtonComponent = new MessageButton({
   customId: 'RecentButton',
   style: 'PRIMARY',
   label: 'See my recent play',
});
