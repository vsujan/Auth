import boom from 'boom';
import httpCode from 'http-status-codes';
import User from '../model/User';
import logger from '../utils/logger';
import * as crypt from '../utils/crypt';
import * as roleService from '../service/role';
import * as tokenService from '../service/token';
import * as sessionService from '../service/session';
import * as auth from '../constant/auth.json';

/**
 * Returns user details and token details on successful login.
 *
 * @param loginParams
 * @returns {Promise}
 */
export async function login(loginParams) {
  try {
    let userDetails = await validateLogin(loginParams);
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

/**
 * Checks if login is correct.
 *
 * @param loginParams
 * @returns {Promise.<*>}
 */
async function validateLogin(loginParams) {
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
 * @returns {Promise.<*>}
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
 * @returns {Promise.<*>}
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
 * @returns {Promise.<void>}
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
