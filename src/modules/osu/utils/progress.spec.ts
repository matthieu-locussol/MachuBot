import type { UserRecent } from './api';
import { computeProgress } from './progress';

const mockedRecent = {
   statistics: {
      count_50: 1,
      count_100: 16,
      count_300: 103,
      count_geki: 16,
      count_katu: 4,
      count_miss: 1,
   },
   beatmap: {
      count_circles: 100,
      count_sliders: 20,
      count_spinners: 1,
   },
} as unknown as UserRecent;

describe(__filename, () => {
   test('computeProgress', () => {
      const samples: [UserRecent['statistics'], UserRecent['beatmap'], string][] = [
         [mockedRecent.statistics, mockedRecent.beatmap, '100'],
         [{ ...mockedRecent.statistics, count_300: 60 }, mockedRecent.beatmap, '64.46'],
      ];

      for (const [statistics, beatmap, output] of samples) {
         expect(computeProgress(statistics, beatmap)).toEqual(output);
      }
   });
});
