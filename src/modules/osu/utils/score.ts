import type { Score, UserBest } from './api';

export const isBestScore = (score: Score | null, bestScores: UserBest[]): UserBest | null => {
   if (score === null) {
      return null;
   }

   const bestScore = bestScores.find(
      ({ beatmap, created_at }) =>
         beatmap.id === score.beatmap.id && created_at === score.created_at,
   );

   if (bestScore === undefined) {
      return null;
   }

   return bestScore;
};
