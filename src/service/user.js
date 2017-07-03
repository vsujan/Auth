import boom from 'boom';
import httpCode from 'http-status-codes';
import User from '../model/User';
import logger from '../utils/logger';
import * as crypt from '../utils/crypt';
import * as roleService from './role';
import * as tokenService from './token';
import * as sessionService from './session';
import * as auth from '../constant/auth.json';

/**
 * Returns user details and token details on successful login.
 *
 * @param loginParams
 * @returns {Promise}
 */
export async function login(loginParams) {
  try {
    let userDetails = await validateUser(loginParams);
    let { id, firstName, lastName, email, contactNumber, roleId } = userDetails.toJSON();

    let roleDetails = await roleService.fetch(roleId);
    let { title, name } = roleDetails.toJSON();
    let tokens = await tokenService.fetchTokens(userDetails.toJSON());

    await sessionService.createSession({
      userId: id,
      refreshToken: tokens.refreshToken
    });

    let userInfo = {
      user: {
        firstName,
        lastName,
        email,
        contactNumber
      },
      role: {
        title,
        name
      },
      tokens
    };

    return userInfo;
  } catch (err) {
    throw (err);
  }
}

async function validateUser(loginParams) {
  let { email, password } = loginParams;

  try {
    let userDetail = await fetchByEmail(email);
    let result = await crypt.compare(password, userDetail.toJSON().password);

    if (!result) {
      throw boom.create(httpCode.FORBIDDEN, auth.incorrectPassword);
    }

    return userDetail;
  } catch (e) {
    logger.debug('Error occured: ', e);
    throw (e);
  }
}

/**
 * Return a single user with given email.
 *
 * @param email
 * @returns {Promise}
 */
async function fetchByEmail(email) {

  try {
    logger.info('Searching user with email: ', email);
    let result = await User.fetchByEmail(email);

    if (!result) {
      logger.debug('No user found with email: ', email);
      throw boom.create(httpCode.FORBIDDEN, auth.incorrectEmail);
    }

    return result;
  } catch (err) {
    logger.error('Database error with message: ', err.message);

    throw err;
  }
}

/**
 * Return a single user with given id.
 *
 * @param id
 * @returns {Promise}
 */
export async function fetchById(id) {
  try {
    logger.info('Searching user with id: ', id);
    let result = await User.fetchById(id);

    if (!result) {
      logger.debug('No user found with id: ', id);
      throw boom.notFound(`Incorrect id`);
    }

    return result;
  } catch (err) {
    logger.error('Database error with message: ', err.message);

    throw err;
  }
}

/**
 * Logout a user with given token.
 *
 * @param token
 * @returns {Promise}
 */
export async function logout(token) {
  try {
    await tokenService.verifyRefreshToken(token);
    let sessionDetails = await sessionService.fetchByToken(token);

    await sessionService.destroy(sessionDetails.toJSON().id);

    return auth.logoutSuccess;
  } catch (error) {
    throw error;
  }
}

/**
 * Reset user password.
 *
 * @param params
 * @returns {Promise}
 */
export async function resetPassword(params) {
  try {
    let { email, oldPassword, newPassword } = params;
    let userDetails = await validateUser({
      email,
      password: oldPassword
    });
    let { id } = userDetails.toJSON();
    let password = await crypt.hash(newPassword);
    let userParams = {
      password
    };

    await User.updateById(id, userParams);
  } catch (err) {
    throw (err);
  }
}
