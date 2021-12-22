import {
   clamp,
   formatCommas,
   formatFloat,
   formatInt,
   secondsToDuration,
   twoDigits,
} from './number';

describe(__filename, () => {
   test('formatCommas', () => {
      const samples: [number, string][] = [
         [0, '0'],
         [123, '123'],
         [12345, '12,345'],
         [123456789, '123,456,789'],
         [123456789.999, '123,456,789.999'],
         [-123456789.999, '-123,456,789.999'],
         [-0.00016547, '-0.00016547'],
      ];

      for (const [input, output] of samples) {
         expect(formatCommas(input)).toEqual(output);
      }
   });

   test('formatInt', () => {
      const samples: [string | number, string][] = [
         ['0', '0'],
         ['1000', '1,000'],
         ['123456.789', '123,456'],
         ['-123456789', '-123,456,789'],
         [0, '0'],
         [1000, '1,000'],
         [123456.789, '123,456'],
         [-123456789, '-123,456,789'],
         [0.0007594, '0'],
      ];

      expect(() => formatInt('')).toThrow();
      expect(() => formatInt('a')).toThrow();

      for (const [input, output] of samples) {
         expect(formatInt(input)).toEqual(output);
      }
   });

   test('formatFloat', () => {
      const samples: [string | number, number | undefined, string][] = [
         ['0', undefined, '0'],
         ['1000', undefined, '1,000'],
         ['123456.789', undefined, '123,457'],
         ['-123456789', undefined, '-123,456,789'],
         [0, undefined, '0'],
         [1000, undefined, '1,000'],
         [123456.789, undefined, '123,457'],
         [-123456789, undefined, '-123,456,789'],
         ['123456.789', 2, '123,456.79'],
         ['123456.789', 3, '123,456.789'],
         ['-123456789', 3, '-123,456,789'],
         [0.0007594, 8, '0.0007594'],
         [-0.0007594123, 8, '-0.00075941'],
      ];

      expect(() => formatFloat('')).toThrow();
      expect(() => formatFloat('a')).toThrow();

      for (const [input, digits, output] of samples) {
         expect(formatFloat(input, digits)).toEqual(output);
      }
   });

   test('clamp', () => {
      const samples: [number, number, number, number][] = [
         [0, 0, 0, 0],
         [0, 0, 3, 0],
         [0, -2, 3, 0],
         [2, 1, 4, 2],
         [1, 1, 4, 1],
         [-1, 1, 4, 1],
         [8, 1, 4, 4],
         [-2, -4, -1, -2],
         [-8, -4, -1, -4],
         [10, -4, -1, -1],
      ];

      for (const [input, min, max, output] of samples) {
         expect(clamp(input, min, max)).toEqual(output);
      }
   });

   test('twoDigits', () => {
      const samples: [number, string][] = [
         [0, '00'],
         [1, '01'],
         [9, '09'],
         [10, '10'],
         [99, '99'],
         [-1, '-1'],
      ];

      for (const [input, output] of samples) {
         expect(twoDigits(input)).toEqual(output);
      }
   });

   test('secondsToDuration', () => {
      const samples: [number, string][] = [
         [0, '00:00'],
         [5, '00:05'],
         [12, '00:12'],
         [120, '02:00'],
         [147, '02:27'],
         [59, '00:59'],
         [3599, '59:59'],
         [3600, '01:00:00'],
         [3601, '01:00:01'],
         [7199, '01:59:59'],
         [7200, '02:00:00'],
      ];

      for (const [input, output] of samples) {
         expect(secondsToDuration(input)).toEqual(output);
      }
   });
});
