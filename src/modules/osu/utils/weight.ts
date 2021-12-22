export const weightToRank = (weight: number): number => {
   const normalizedWeight = weight / 100;
   const value = Math.log(normalizedWeight) / Math.log(0.95);
   const rank = Math.round(value) + 1;
   return rank;
};
