import { _assertTrue } from './_assert';

export const formatCommas = (value: number): string =>
   value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

export const formatInt = (value: number | string): string => {
   const numericValue = parseInt(String(value), 10);
   _assertTrue(!Number.isNaN(numericValue), `Value ${value} is not a correct number`);
   return formatCommas(numericValue);
};

export const formatFloat = (value: number | string, digits?: number): string => {
   const numericValue = parseFloat(String(value));
   _assertTrue(!Number.isNaN(numericValue), `Value ${value} is not a correct number`);
   const fixedValue = numericValue.toFixed(digits);
   const fixedNumericalValue = parseFloat(fixedValue);
   return formatCommas(fixedNumericalValue);
};

export const clamp = (n: number, low: number, high: number): number =>
   Math.max(low, Math.min(n, high));

export const twoDigits = (n: number): string => {
   if (n >= 0 && n < 10) {
      return `0${n}`;
   }

   return String(n);
};

const SECONDS_IN_1_HOUR = 3600.0;
const MINUTES_IN_1_HOUR = 60.0;
const SECONDS_IN_1_MINUTE = 60.0;

export const secondsToDuration = (seconds: number): string => {
   const hours = seconds / SECONDS_IN_1_HOUR;
   const minutes = (hours % 1) * MINUTES_IN_1_HOUR;

   const realSeconds = Math.floor((minutes % 1) * SECONDS_IN_1_MINUTE);
   const realMinutes = Math.floor(minutes);
   const realHours = Math.floor(hours);

   if (realHours === 0) {
      return `${twoDigits(realMinutes)}:${twoDigits(realSeconds)}`;
   }

   return `${twoDigits(realHours)}:${twoDigits(realMinutes)}:${twoDigits(realSeconds)}`;
};

export const random = (min: number, max: number): number => {
   const clampedMin = Math.ceil(min);
   const clampedMax = Math.floor(max);

   return Math.floor(Math.random() * (clampedMax - clampedMin + 1)) + clampedMin;
};
