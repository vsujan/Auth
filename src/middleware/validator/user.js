import * as schema from '../../schema/user';
import * as validator from '../../utils/validator';

/**
 * Validate a login request against a schema.
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise}
 */
export function validateLogin(req, res, next) {
  const user = req.body;

  return validator.validate(user, schema.loginSchema)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate change password request against a schema.
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise}
 */
export function validateChangePassword(req, res, next) {
  const user = req.body;

  return validator.validate(user, schema.changePasswordSchema)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate forgot password request against a schema.
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise}
 */
export function validateForgotPassword(req, res, next) {
  const email = req.body;

  return validator.validate(email, schema.forgotPasswordSchema)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate reset password request against a schema.
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise}
 */
export function validateResetPassword(req, res, next) {
  const newPassword = req.body;

  return validator.validate(newPassword, schema.resetPasswordSchema)
    .then(() => next())
    .catch(err => next(err));
}
