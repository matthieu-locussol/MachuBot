import { makeChart } from './chart';

describe(__filename, () => {
   test('makeChart', async () => {
      const result = await makeChart([{ label: '0', value: 25 }], {});
      expect(result.toJSON()).toEqual({
         type: 'Buffer',
         data: [
            137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 1, 43, 0, 0, 0, 160,
            8, 6, 0, 0, 0, 84, 164, 74, 27, 0, 0, 0, 6, 98, 75, 71, 68, 0, 255, 0, 255, 0, 255, 160,
            189, 167, 147, 0, 0, 0, 208, 73, 68, 65, 84, 120, 156, 237, 193, 49, 1, 0, 0, 0, 194,
            160, 245, 79, 109, 9, 79, 160, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 224, 111, 236, 62, 0, 1,
            207, 98, 227, 58, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130,
         ],
      });
   });
});