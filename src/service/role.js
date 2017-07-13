import boom from 'boom';
import Role from '../model/Role';
import logger from '../utils/logger';

/**
 * Return role of a given user.
 *
 * @param id
 * @returns {Promise}
 */
export async function fetch(id) {
  try {
    logger.info('Searching role with id: ', id);
    let result = await Role.fetchById(id);

    if (!result) {
      logger.debug('No role found with id: ', id);
      throw boom.notFound(`Role with id: ${id} not found`);
    }

    logger.debug('Role is: ', result);

    return result;
  } catch (err) {
    logger.error('Database error with message: ', err.message);
    throw err;
  }
}
