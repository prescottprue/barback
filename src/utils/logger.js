import winston from 'winston';
import { LoggingWinston as StackdriverTransport } from '@google-cloud/logging-winston';

const isProduction = process.env.NODE_ENV === 'production';

const transports = [
  new winston.transports.Console({
    json: true,
    colorize: !isProduction,
  }),
];

if (process.env.GCLOUD_PROJECT && isProduction) {
  transports.push(new StackdriverTransport());
}

const logger = new winston.Logger({
  transports,
  exitOnError: false, // do not exit on handled exceptions
});

const { error, warn, info, log, verbose, debug, silly } = logger;

export { error, warn, info, log, verbose, debug, silly };

export default { error, warn, info, log, verbose, debug, silly };
