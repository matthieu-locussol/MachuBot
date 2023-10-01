export const getUserAvatar = (userId: string, avatar: string | null): string | undefined =>
   avatar !== null ? `https://cdn.discordapp.com/avatars/${userId}/${avatar}.jpeg` : undefined;
