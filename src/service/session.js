import boom from 'boom';
import logger from '../utils/logger';
import Session from '../model/Session';
import * as auth from '../constant/auth.json';
import * as dbError from '../constant/dbErrors';
import * as commonError from '../constant/commonErrors';

/**
 * Return a session for a given user with refresh tokens.
 *
 * @param data
 * @returns {Promise}
 */
export async function createSession(data) {
  let session = new Session(data);

  logger.info('Creating a new session with data', data);
  try {
    let result = await session.save();

    if (!result) {
      logger.debug(auth.noSession);
      throw boom.notFound(auth.noSession);
    }
    logger.debug('Session created', result.toJSON());

    return result;
  } catch (err) {
    logger.error('Database error with message: ', err.message);

    if (err.code === dbError.UNIQUE_VIOLATION) {
      throw boom.badRequest(commonError.BAD_REQUEST);
    }
    throw err;
  }
}

/**
 * Return a session for a given token.
 *
 * @param token
 * @returns {Promise}
 */
export async function fetchByToken(token) {
  try {
    let result = await Session.fetchByToken(token);

    if (!result) {
      logger.debug(auth.noSession);
      throw boom.notFound(auth.noSession);
    }
    logger.debug('Session fetched with data: ', result.toJSON());

    return result;
  } catch (err) {
    logger.error('Database error with message: ', err);
    throw err;
  }
}

/**
 * Delete a session with given userid.
 *
 * @param id
 * @returns {Promise}
 */
export async function destroyByUserId(userId) {
  try {
    let result = await Session.fetchByUserId(userId);

    if (!result) {
      logger.debug(auth.noSession);
      throw boom.notFound(auth.noSession);
    }
    result.destroy();

    return null;
  } catch (err) {
    logger.error('Database error with message: ', err.message);
    throw err;
  }
}
