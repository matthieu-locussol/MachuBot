import { toUpperFirst } from './string';

describe(__filename, () => {
   test('toUpperFirst', () => {
      const samples: [string, string][] = [
         ['', ''],
         ['a', 'A'],
         ['abc', 'Abc'],
         ['some string', 'Some string'],
         ['A Sentence', 'A Sentence'],
      ];

      for (const [input, output] of samples) {
         expect(toUpperFirst(input)).toEqual(output);
      }
   });
});
