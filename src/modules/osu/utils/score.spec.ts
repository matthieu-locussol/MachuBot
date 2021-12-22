import type { Score, UserBest } from './api';
import { isBestScore } from './score';

const makeMockedScore = (id: string) =>
   ({
      beatmap: {
         id,
      },
      created_at: '',
   } as unknown as Score);

const makeMockedUserBest = (id: string) =>
   ({
      beatmap: {
         id,
      },
      created_at: '',
   } as unknown as UserBest);

describe(__filename, () => {
   test('isBestScore', () => {
      const samples: [Score | null, UserBest[], UserBest | null][] = [
         [null, [], null],
         [null, [makeMockedUserBest('123')], null],
         [makeMockedScore('123'), [makeMockedUserBest('123')], makeMockedUserBest('123')],
         [makeMockedScore('456'), [makeMockedUserBest('123')], null],
      ];

      for (const [score, bests, output] of samples) {
         expect(isBestScore(score, bests)).toEqual(output);
      }
   });
});
