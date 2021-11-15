export const isUnique = <T>(array: T[]): boolean => {
   const set = new Set<T>(array);
   return set.size === array.length;
};
