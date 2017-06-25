import * as userService from '../service/user';
import * as tokenService from '../service/token';

/**
 * Return new access token based on the refresh token.
 *
 * @param token
 * @returns {Promise.<*>}
 */
export async function generateNewToken(token) {
  try {
    let data = await tokenService.verifyRefreshToken(token);
    let userDetails = await userService.fetchById(data.encryptedData.id);
    let accessToken = await tokenService.fetchAccessToken(userDetails.toJSON());

    return accessToken;
  } catch (err) {
    throw (err);
  }
}
