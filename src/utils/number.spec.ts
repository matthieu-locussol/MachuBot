import { formatCommas, formatFloat, formatInt } from './number';

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
});
