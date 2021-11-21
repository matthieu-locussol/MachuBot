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
