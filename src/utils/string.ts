export const toUpperFirst = (value: string): string => {
   if (value === '') {
      return '';
   }

   return `${value[0].toUpperCase()}${value.slice(1)}`;
};

export const YOUTUBE_REGEX =
   /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?[\w?=]*)?/;

export const isYoutubeUrl = (url: string): boolean => YOUTUBE_REGEX.test(url);

export const extractYoutubeLink = (str: string): string => {
   const match = str.match(YOUTUBE_REGEX);
   return match ? match[0] : '';
};
