import { MODS } from './constants';

export type Mod = keyof typeof MODS;

export const getModsBits = (mods: Mod[]): number => mods.reduce((sum, mod) => sum + MODS[mod], 0);
