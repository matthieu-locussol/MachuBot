import { isYoutubeUrl, toUpperFirst } from './string';

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

   test('isYoutubeUrl', () => {
      const samples: [string, boolean][] = [
         ['', false],
         ['https://www.youtube.com/watch?v=1234567890', true],
         ['https://www.youtube.com/watch?v=1234567890&list=1234567890', true],
         ['https://www.youtube.com/watch?v=1234567890&list=1234567890&index=123', true],
         ['https://www.youtube.com/watch?v=1234567890&index=123', true],
         ['https://www.youtube.com/watch?v=1234567890&index=123&list=1234567890', true],
         ['http://www.youtube.com/watch?v=abcdefghijk', true],
         ['https://www.youtube.com/watch?v=abcdefghijk', true],
         ['https://youtu.be/abcdefghijk', true],
         ['http://youtu.be/abcdefghijk', true],
         ['http://youtube.com/watch?v=abcdefghijk', true],
         ['https://youtube.com/watch?v=abcdefghijk', true],
         ['https://www.youtube.com/watch?v=abcdefghijk&feature=youtu.be', true],
         ['http://youtu.be/abcdefghijk?feature=youtu.be', true],
      ];

      for (const [input, output] of samples) {
         expect(isYoutubeUrl(input)).toEqual(output);
      }
   });
});
