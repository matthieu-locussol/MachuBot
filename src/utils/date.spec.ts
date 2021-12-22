import { DateTime, Settings } from 'luxon';
import { formatDateTime, formatTimeAgo } from './date';

describe(__filename, () => {
   beforeAll(() => {
      const expectedNow = DateTime.fromISO('2021-12-20T23:09:00+00:00');
      Settings.now = () => expectedNow.toMillis();
   });

   test('formatDateTime', () => {
      const samples: [string, string][] = [
         ['', 'Unknown'],
         ['2021-12-20', '20 Dec 2021'],
         ['2021-12-20T23:09:00+00:00', '20 Dec 2021'],
      ];

      for (const [input, output] of samples) {
         expect(formatDateTime(input)).toBe(output);
      }
   });

   test('formatTimeAgo', () => {
      const samples: [string, string][] = [
         ['', ''],
         ['2021-12-20T23:09:00+00:00', 'now'],
         ['2021-12-20T23:08:59+00:00', '1 second ago'],
         ['2021-12-20T23:07:59+00:00', '1 minute ago'],
         ['2021-12-20T22:07:59+00:00', '1 hour ago'],
         ['2021-12-19T14:28:49+00:00', '1 day ago'],
         ['2021-11-20T14:28:49+00:00', '1 month ago'],
         ['2020-12-20T14:28:49+00:00', '1 year ago'],
      ];

      for (const [input, output] of samples) {
         expect(formatTimeAgo(input)).toBe(output);
      }
   });
});
