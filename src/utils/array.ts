export const isUnique = <T>(array: T[]): boolean => {
   const set = new Set<T>(array);
   return set.size === array.length;
};

export const unique = <T>(array: T[]): T[] => {
   const set = new Set<T>(array);
   return [...set];
};

export const sum = (array: number[]): number => array.reduce((acc, curr) => acc + curr, 0);

export const pickRandom = <T>(array: T[]): T => {
   const randomIndex = Math.floor(Math.random() * array.length);
   return array[randomIndex];
};
