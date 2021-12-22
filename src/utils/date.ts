import { DateTime } from 'luxon';

export const formatDateTime = (dateTimeStr: string): string => {
   const dateStr = dateTimeStr.split('T')[0];
   const date = DateTime.fromISO(dateStr);

   if (date.isValid) {
      return date.toLocaleString(DateTime.DATE_MED, { locale: 'en-GB' });
   }

   return 'Unknown';
};

export const formatTimeAgo = (dateTimeStr: string): string => {
   const duration = DateTime.fromISO(dateTimeStr).toRelative({
      locale: 'en-GB',
   });

   if (duration === 'in 0 seconds') {
      return 'now';
   }

   return duration || '';
};
