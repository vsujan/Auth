import boom from 'boom';
import moment from 'moment';
import httpCode from 'http-status-codes';
import User from '../model/User';
import logger from '../utils/logger';
import config from '../config/config';
import * as email from '../utils/email';
import * as crypt from '../utils/crypt';
import * as auth from '../constant/auth.json';
import * as roleService from '../service/role';
import * as tokenService from '../service/token';
import { MAIL_DATE_FORMAT } from '../constant/date';
import * as sessionService from '../service/session';
import * as userTokenService from '../service/userToken';

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

/**
 * Validate user.
 *
 * @param loginParams
 * @returns {Promise}
 */
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
export async function logout(authorizationString) {
  try {
    let length = authorizationString.length;
    let accessToken = authorizationString.slice(7, length);
    let data = tokenService.verifyAccessToken(accessToken);

    await sessionService.destroyByUserId(data.encryptedData.id);

    return auth.logoutSuccess;
  } catch (error) {
    throw error;
  }
}

/**
 * Change user password.
 *
 * @param params
 * @returns {Promise}
 */
export async function changePassword(params) {
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

/**
 * Send reset password link for forgot password.
 *
 * @param payload
 * @param baseUrl
 * @returns {Promise}
 */
export async function forgotPassword(payload, baseUrl) {
  let user = await fetchByEmail(payload.email);
  let userInfo = user.toJSON();
  let userId = userInfo.id;
  let userToken = await userTokenService.fetchByUserId(userId);

  if (userToken !== null) {
    await userTokenService.destroy(userToken.get('id'));
  }

  let token = await tokenService.fetchForgotPasswordToken(payload);
  let link = baseUrl + '/' + config.auth.resetPasswordKey + '/' + token;
  let emailParams = {
    userName: userInfo.firstName,
    userEmail: userInfo.email,
    link,
    queryDate: moment().format(MAIL_DATE_FORMAT)
  };

  await email.sendResetPasswordMail(emailParams, config.ses.resetPasswordMail);
  await userTokenService.saveToken({
    userId,
    token
  });
}

/**
 * Reset user password.
 *
 * @param token
 * @param payload
 * @returns {Promise}
 */
export async function resetPassword(token, payload) {
  await tokenService.verifyForgotPasswordToken(token);
  let userToken = await userTokenService.fetchByUserToken(token);
  let userTokenInfo = userToken.toJSON();
  let password = await crypt.hash(payload.newPassword);
  let newParams = {
    password
  };

  await User.updateById(userTokenInfo.userId, newParams);
  await userTokenService.destroy(userTokenInfo.id);
}
