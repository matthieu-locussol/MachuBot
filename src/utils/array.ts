export const isUnique = <T>(array: T[]): boolean => {
   const set = new Set<T>(array);
   return set.size === array.length;
};

export const unique = <T>(array: T[]): T[] => {
   const set = new Set<T>(array);
   return [...set];
};
