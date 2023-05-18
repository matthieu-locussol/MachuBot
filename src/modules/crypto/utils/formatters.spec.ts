import type { ChartPoint } from '../../../utils/chart';
import {
   getChartPoint,
   getColoredValue,
   getCryptoDominationMarkdown,
   getPriceValue,
} from './formatters';

describe(__filename, () => {
   test('getColoredValue', () => {
      const samples: [number, string, string][] = [
         [0, '%', '```diff\n+0%```'],
         [1.27, '%', '```diff\n+1.27%```'],
         [-3.14, '%', '```diff\n-3.14%```'],
         [408, '€', '```diff\n+408€```'],
      ];

      for (const [value, suffix, output] of samples) {
         expect(getColoredValue(value, suffix)).toBe(output);
      }
   });

   test('getPriceValue', () => {
      const samples: [number, string, string][] = [
         [-12, 'eur', '-12€'],
         [0, 'eur', '0€'],
         [15, 'eur', '15€'],
         [-12.5, 'usd', '-12.5$'],
         [0.0, 'usd', '0$'],
         [15.7, 'usd', '15.7$'],
         [15.7, 'cad', '15.7'],
      ];

      for (const [value, currency, output] of samples) {
         expect(getPriceValue(value, currency)).toBe(output);
      }
   });

   test('getCryptoDominationMarkdown', () => {
      expect(getCryptoDominationMarkdown([])).toBe('``````');
      expect(getCryptoDominationMarkdown([{ name: 'sample', percentage: 25 }])).toBe(
         '```1. sample 25.00%```',
      );
      expect(
         getCryptoDominationMarkdown([
            { name: 'sample', percentage: 25 },
            { name: 'sample2', percentage: 52 },
         ]),
      ).toBe('```1. sample 25.00%\n2. sample2 52.00%```');
   });

   test('getChartPoint', () => {
      const samples: [[number, number], ChartPoint][] = [
         [[0, 65.25], { label: '1/1', value: 65.25 }],
         [[1637685541000, 25], { label: '24/11', value: 25 }],
      ];

      for (const [input, output] of samples) {
         expect(getChartPoint(input)).toStrictEqual(output);
      }
   });
});
