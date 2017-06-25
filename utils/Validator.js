import Joi from 'joi';
import logger from '../utils/logger';

/**
 * Validates a given data against predefined schema.
 *
 * @param data
 * @param schema
 * @returns {Promise}
 */
export function validate(data, schema) {
  return new Promise((resolve, reject) => {
    let { error, result } = Joi.validate(data, schema);

    logger.info('Validating data: ', data);

    if (error) {
      logger.debug('Validation error: ', error);
      reject(error);

      return;
    }

    resolve(result);
  });
}
