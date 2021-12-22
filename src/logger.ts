import { resolve } from 'path';
import winston, { format } from 'winston';
import 'winston-daily-rotate-file';

export const logger = winston.createLogger({
   level: 'info',
   format: format.combine(
      format.timestamp({
         format: 'DD/MM/YY HH:mm:ss',
      }),
      format.json(),
   ),
   transports: [
      new winston.transports.DailyRotateFile({
         filename: resolve(__dirname, '../logs/MachuBot-%DATE%.log'),
         datePattern: 'DD-MM-YYYY-HH',
         zippedArchive: true,
         maxSize: '20m',
         maxFiles: '14d',
      }),
   ],
});

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
   logger.add(
      new winston.transports.Console({
         format: winston.format.simple(),
      }),
   );
}
