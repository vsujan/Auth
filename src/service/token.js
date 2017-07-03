import boom from 'boom';
import httpError from 'http-status-codes';
import * as jwt from '../utils/jwt';
import * as auth from '../constant/auth.json';
import * as sessionService from './session';

/**
 * Generate access and refresh tokens.
 *
 * @param params
 * @returns {{accessToken: string, refreshToken: string}}
 */
export function fetchTokens(params) {
  return jwt.generateTokens(params);
}

/**
 * Verify refresh token.
 *
 * @param token
 * @returns {string}
 */
export async function verifyRefreshToken(token) {
  try {
    return jwt.verifyRefreshToken(token);
  } catch (err) {
    if (err.name === auth.tokenExpired) {
      let sessionDetails = await sessionService.fetchByToken(token);

      await sessionService.destroy(sessionDetails.toJSON().id);
      throw boom.create(httpError.UNAUTHORIZED, auth.sessionExpiredMsg);
    }
    throw boom.create(httpError.UNAUTHORIZED, auth.invalidTokenMsg);
  }
}

export function fetchAccessToken(params) {
  return jwt.generateAccessToken(params);
}
