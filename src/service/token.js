import boom from 'boom';
import httpError from 'http-status-codes';
import * as jwt from '../utils/jwt';
import * as auth from '../constant/auth.json';
import * as sessionService from '../service/session';
import * as userTokenService from '../service/userToken';

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
      await sessionService.destroy(token);
      throw boom.create(httpError.UNAUTHORIZED, auth.sessionExpiredMsg);
    }
    throw boom.create(httpError.UNAUTHORIZED, auth.invalidTokenMsg);
  }
}

/**
 * Return access token.
 *
 * @param params
 * @returns {string}
 */
export function fetchAccessToken(params) {
  return jwt.generateAccessToken(params);
}

/**
 * Return forgot password token.
 *
 * @param params
 * @returns {string}
 */
export function fetchForgotPasswordToken(params) {
  return jwt.generateForgotPasswordToken(params);
}

/**
 * Verify forgot password token.
 *
 * @param token
 * @returns {Promise}
 */
export async function verifyForgotPasswordToken(token) {
  try {
    await jwt.verifyForgotPasswordToken(token);
  } catch (err) {
    if (err.name === auth.tokenExpired) {
      let userToken = await userTokenService.fetchByUserToken(token);

      await userTokenService.destroy(userToken.get('id'));
      throw boom.create(httpError.UNAUTHORIZED, auth.tokenExpiredMsg);
    }
    throw boom.create(httpError.UNAUTHORIZED, auth.invalidTokenMsg);
  }
}
