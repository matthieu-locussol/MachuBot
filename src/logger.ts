/* eslint-disable no-console */

export const log = (message: string): void => {
   console.log(`[LOG] ${message}`);
};

export const debug = (message: string): void => {
   console.log(`[DBG] ${message}`);
};

export const warning = (message: string): void => {
   console.warn(`[WRN] ${message}`);
};

export const error = (message: string): void => {
   console.error(`[ERR] ${message}`);
};
