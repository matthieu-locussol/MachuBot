import { ChartPoint } from '../../../utils/chart';
import type { CryptoMarketEmbedPayload } from './embeds/CryptoMarketEmbed';

const currencySymbols: Record<string, string> = {
   eur: '€',
   usd: '$',
} as const;
export const getColoredValue = (value: number, suffix?: string): string =>
   `\`\`\`diff\n${value >= 0 ? '+' : ''}${value}${suffix}\`\`\``;

export const getPriceValue = (value: unknown, currency: string): string => {
   const symbol = currencySymbols[currency] || '';
   return `${value}${symbol}`;
};

export const getCryptoDominationMarkdown = (
   list: CryptoMarketEmbedPayload['domination'],
): string => {
   const elements = list.map(
      ({ name, percentage }, idx) => `${idx + 1}. ${name} ${percentage.toFixed(2)}%`,
   );
   const markdown = `\`\`\`${elements.join('\n')}\`\`\``;
   return markdown;
};

export const getChartPoint = (entry: [number, number]): ChartPoint => {
   const [timestamp, value] = entry;

   const date = new Date(timestamp);
   const label = `${date.getDate()}/${date.getMonth() + 1}`;

   return { label, value };
};
