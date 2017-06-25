import fs from 'fs';
import winston from 'winston';
import 'winston-daily-rotate-file';
import config from '../config/config';

const { level, path } = config.logging;
const timestamp = () => new Date().toISOString();

// Create log path if it does not exist
if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}

/**
 * Custom formatter for the logs.
 *
 * @param {Object} options
 * @returns {String}
 */
function formatter(options) {
  let level = winston.config.colorize(options.level, options.level.toUpperCase());
  let message = options.message ? options.message : '';
  let hasMeta = (options.meta && Object.keys(options.meta).length);
  let meta = hasMeta ? '\n' + JSON.stringify(options.meta, null, 4) : '';

  return `${options.timestamp()}  [ ${level} ]  ${message}  ${meta}`;
}

// Create a logger using the configuration.
const logger = new (winston.Logger)({
  transports: [
    new winston.transports.Console({
      level,
      formatter,
      timestamp,
      colorize: true
    }),
    new winston.transports.DailyRotateFile({
      level,
      formatter,
      timestamp,
      prepend: true,
      datePattern: 'yyyy-MM-dd',
      filename: `${path}/-log.log`
    })
  ]
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

export default logger;
