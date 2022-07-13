import type { HexColorString } from 'discord.js';

export const OSU_COLORS: Record<string, HexColorString> = {
   F: '#E7434A',
   D: '#F33836',
   C: '#FF35F0',
   B: '#3B73FF',
   A: '#46E424',
   S: '#FEF337',
   SH: '#DDFAFF',
   X: '#FEF337',
   XH: '#DDFAFF',
};

export const MODS = {
   NF: 1,
   EZ: 1 << 1,
   TD: 1 << 2,
   HD: 1 << 3,
   HR: 1 << 4,
   SD: 1 << 5,
   DT: 1 << 6,
   RX: 1 << 7,
   HT: 1 << 8,
   NC: 1 << 9,
   FL: 1 << 10,
   AP: 1 << 11,
   SO: 1 << 12,
   PF: 1 << 14,
};
