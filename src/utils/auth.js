import boom from 'boom';
import HttpStatus from 'http-status-codes';
import * as jwt from './jwt';
import * as auth from '../constant/auth.json';

/**
 * Validate a given token.
 *
 * @param token
 * @returns {Promise}
 */
export function validate(token) {
  try {
    return jwt.verifyAccessToken(token);
  } catch (err) {
    if (err.name === auth.tokenExpired) {
      throw boom.create(HttpStatus.UNAUTHORIZED, auth.tokenExpiredMsg);
    }
    throw boom.create(HttpStatus.UNAUTHORIZED, auth.invalidTokenMsg);
  }
}
