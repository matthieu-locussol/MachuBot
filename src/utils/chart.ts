import { Chart, ChartConfiguration } from 'chart.js';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

export interface ChartPoint {
   label?: string;
   value: number;
}

type ChartColor = 'BLUE' | 'RED' | 'GREEN';

export interface ChartOptions {
   width: number;
   height: number;
   title: string;
   color: ChartColor;
   radius: number;
   showScales: boolean;
}

const chartColors: Record<
   ChartColor,
   {
      borderColor: string;
      backgroundColor: string;
   }
> = {
   BLUE: {
      borderColor: 'rgba(107, 129, 255, 1)',
      backgroundColor: 'rgba(107, 129, 255, 0.2)',
   },
   RED: {
      borderColor: 'rgba(255, 129, 107, 1)',
      backgroundColor: 'rgba(255, 129, 107, 0.2)',
   },
   GREEN: {
      borderColor: 'rgba(129, 255, 107, 1)',
      backgroundColor: 'rgba(129, 255, 107, 0.2)',
   },
};

const defaultOptions: ChartOptions = {
   width: 299,
   height: 160,
   title: '',
   color: 'BLUE',
   radius: 0,
   showScales: false,
};

export const makeChart = async (
   values: ChartPoint[],
   options: Partial<ChartOptions>,
): Promise<Buffer> => {
   const { width, height, title, color, radius, showScales } = {
      ...defaultOptions,
      ...options,
   };

   Chart.defaults.plugins.legend.display = !!title;

   const configuration: ChartConfiguration = {
      type: 'line',
      data: {
         labels: values.map(({ label }) => label || ''),
         datasets: [
            {
               label: title,
               data: values.map(({ value }) => value),
               borderColor: chartColors[color].borderColor,
               borderWidth: 1,
               fill: {
                  target: 'origin',
                  above: chartColors[color].backgroundColor,
               },
            },
         ],
      },
      options: {
         scales: {
            x: {
               display: showScales,
            },
            y: {
               display: showScales,
            },
         },
         elements: {
            point: {
               radius,
            },
         },
      },
   };

   const chartJSNodeCanvas = new ChartJSNodeCanvas({
      width,
      height,
   });

   const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
   return imageBuffer;
};
