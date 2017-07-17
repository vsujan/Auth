import jwt from 'jsonwebtoken';
import config from '../config/config';

/**
 * Return access and refresh tokens.
 *
 * @param data
 * @returns {{accessToken: string, refreshToken: string}}
 */
export function generateTokens(data) {
  return {
    accessToken: generateAccessToken(data),
    refreshToken: generateRefreshToken(data)
  };
}

/**
 * Return access token.
 *
 * @param data
 * @returns {string}
 */
export function generateAccessToken(data) {
  return jwt.sign({ encryptedData: data }, config.auth.accessTokenSalt, { expiresIn: config.auth.accessTokenExpiry });
}

/**
 * Return refresh token.
 *
 * @param data
 * @returns {string}
 */
export function generateRefreshToken(data) {
  return jwt.sign({ encryptedData: data }, config.auth.refreshTokenSalt, { expiresIn: config.auth.refreshTokenExpiry });
}

/**
 * Verify access token.
 *
 */
export function verifyAccessToken(token) {
  return jwt.verify(token, config.auth.accessTokenSalt);
}

/**
 * Verify refresh token.
 *
 */
export function verifyRefreshToken(token) {
  return jwt.verify(token, config.auth.refreshTokenSalt);
}

/**
 * Return forgot password token.
 *
 */
export function generateForgotPasswordToken(data) {
  return jwt.sign({ encryptedData: data }, config.auth.forgotPasswordSalt, { expiresIn: config.auth.forgotPasswordExpiry });
}

/**
 * Verify forgot password token.
 *
 */
export function verifyForgotPasswordToken(token) {
  return jwt.verify(token, config.auth.forgotPasswordSalt);
}

/**
 * Return forgot password token.
 *
 */
export function generateRegisterToken(data) {
  return jwt.sign({ encryptedData: data }, config.auth.registerSalt);
}

/**
 * Verify forgot password token.
 *
 */
export function verifyRegisterToken(token) {
  return jwt.verify(token, config.auth.registerSalt);
}
