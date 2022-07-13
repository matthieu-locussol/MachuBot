import { getModsBits, Mod } from './mods';

describe(__filename, () => {
   test('getModsBits', () => {
      const samples: [Mod[], number][] = [
         [[], 0],
         [['HD'], 8],
         [['HD', 'HR'], 24],
         [['HD', 'DT'], 72],
         [['HD', 'DT', 'HR'], 88],
      ];

      for (const [input, output] of samples) {
         expect(getModsBits(input)).toEqual(output);
      }
   });
});
