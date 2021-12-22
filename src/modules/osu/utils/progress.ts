import { formatFloat } from '../../../utils/number';
import type { UserRecent } from './api';

export const computeProgress = (
   statistics: UserRecent['statistics'],
   beatmap: UserRecent['beatmap'],
): string => {
   const sum = [
      statistics.count_300,
      statistics.count_100,
      statistics.count_50,
      statistics.count_miss,
   ].reduce((acc, curr) => acc + curr, 0);
   const total = beatmap.count_circles + beatmap.count_sliders + beatmap.count_spinners;
   const progress = (sum / total) * 100;
   return formatFloat(progress, 2);
};
