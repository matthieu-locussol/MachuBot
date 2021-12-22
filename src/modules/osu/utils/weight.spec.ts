import { weightToRank } from './weight';

describe(__filename, () => {
   test('weightToRank', () => {
      const samples: [number, number][] = [
         [100, 1],
         [90.25, 3],
         [63.02494097246091, 10],
         [5.373354598274028, 58],
         [0.6232136021404208, 100],
      ];

      for (const [input, output] of samples) {
         expect(weightToRank(input)).toEqual(output);
      }
   });
});
