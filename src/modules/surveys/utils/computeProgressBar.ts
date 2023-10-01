export const computeProgressBar = (percentage: number): string => {
   const max = 10;
   const full = Math.floor(percentage / (100 / max));
   const empty = max - full;

   return `${'⬜ '.repeat(full)}${' '.repeat(empty)}`;
};

//
