import { isUnique } from './array';

describe(__filename, () => {
   test('isUnique', () => {
      const samples: [(string | number)[], boolean][] = [
         [[], true],
         [[1, 2, 3], true],
         [[1, 2, 2], false],
         [['a', 'b', 'c'], true],
         [['a', 'b', 'b', 'c'], false],
      ];

      for (const [input, output] of samples) {
         expect(isUnique(input)).toEqual(output);
      }
   });
});
