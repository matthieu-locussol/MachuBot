import { _assert } from './_assert';

export const accessEnvironmentVariable = (
   productionName: string,
   developmentName: string,
): string => {
   const productionVariable = process.env[productionName];
   const developmentVariable = process.env[developmentName];

   if (process.env.NODE_ENV === 'production') {
      _assert(productionVariable);
      return productionVariable;
   }

   _assert(developmentVariable);
   return developmentVariable;
};
