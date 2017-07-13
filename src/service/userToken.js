import * as logger from '../utils/logger';
import UserToken from '../model/UserToken';
import * as auth from '../constant/auth.json';

/**
 * Return user-token for a given id.
 *
 * @param id
 * @returns {Promise}
 */
export function fetchByUserId(id) {
  return UserToken.fetchByUserId(id);
}

/**
 * Return user-token for a given token.
 * @param token
 * @returns {Promise}
 */
export function fetchByUserToken(token) {
  return UserToken.fetchByToken(token);
}

/**
 * Destroy a user-token for a given id.
 *
 * @param id
 * @returns {Promise}
 */
export async function destroy(id) {
  let result = await UserToken.fetchById(id);

  if (!result) {
      logger.debug(auth.noToken);
      throw boom.notFound(auth.noToken);
    }

  return result.destroy();
}

/**
 * Create a new user-token.
 *
 * @param params
 * @returns {*}
 */
export function saveToken(params) {
  return new UserToken(params).save();
}
