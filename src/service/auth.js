import * as userService from './user';
import * as tokenService from './token';
import * as sessionService from './session';

/**
 * Return new access token based on the refresh token.
 *
 * @param token
 * @returns {Promise}
 */
export async function generateNewToken(token) {
  try {
    await sessionService.fetchByToken(token);
    let data = await tokenService.verifyRefreshToken(token);
    let userDetails = await userService.fetchById(data.encryptedData.id);
    let accessToken = await tokenService.fetchAccessToken(userDetails.toJSON());

    return accessToken;
  } catch (err) {
    throw (err);
  }
}
