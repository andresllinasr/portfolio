/* eslint-disable no-console */
declare const process: { env: { NODE_ENV?: string } };

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  warn: (message: string, ...args: unknown[]): void => {
    if (isDevelopment) {
      console.warn(`[Portfolio] ${message}`, ...args);
    }
  },

  error: (message: string, ...args: unknown[]): void => {
    if (isDevelopment) {
      console.error(`[Portfolio] ${message}`, ...args);
    }
  },

  info: (message: string, ...args: unknown[]): void => {
    if (isDevelopment) {
      console.info(`[Portfolio] ${message}`, ...args);
    }
  },

  debug: (message: string, ...args: unknown[]): void => {
    if (isDevelopment) {
      console.debug(`[Portfolio] ${message}`, ...args);
    }
  }
};