import axios from 'axios';
import { AttachmentBuilder } from 'discord.js';
import type { ChartOptions } from '../../../../utils/chart';
import { makeChart } from '../../../../utils/chart';
import { getChartPoint } from '../formatters';

interface CoinGeckoChartResponse {
   prices: [number, number][];
}

export const makeCoinChart = async (
   coinId: string,
   currency: string,
   chartName: string,
): Promise<AttachmentBuilder> => {
   const response = await axios.get<CoinGeckoChartResponse>(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=30&interval=daily`,
   );
   const results = response.data;

   const chartOptions: Partial<ChartOptions> = {
      width: 400,
      height: 160,
      color: 'GREEN',
      radius: 2,
      showScales: true,
   };

   const chartBuffer = await makeChart(
      results.prices.map((entry) => getChartPoint(entry)),
      chartOptions,
   );

   const chartAttachment = new AttachmentBuilder(chartBuffer, { name: chartName });
   return chartAttachment;
};
