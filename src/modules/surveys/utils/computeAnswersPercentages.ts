export const computeAnswersPercentages = (
   results: Record<number, string[]>,
): Record<number, number> => {
   const percentages: Record<number, number> = {};
   const total = Object.values(results).reduce((acc, users) => acc + users.length, 0);

   Object.entries(results).forEach(([answerIndex, users]) => {
      percentages[Number(answerIndex)] = total === 0 ? 0 : (users.length / total) * 100;
   });

   return percentages;
};
