import * as user from '../service/user';
import { getBaseUrl } from '../utils/url';

/**
 * Register a user to the application.
 *
 */
export function register(req, res, next) {
  user.register(req.body)
    .then(data => res.json(data))
    .catch(e => next(e));
}

/**
 * Returns login details.
 *
 * @param req
 * @param res
 * @param next
 */
export function login(req, res, next) {
  let { email, password } = req.body;

  user.login({ email, password })
    .then(data => res.json(data))
    .catch(e => next(e));
}

/**
 * Logout from the application
 * @param req
 * @param res
 * @param next
 */
export function logout(req, res, next) {
  let authorizationString = req.headers.authorization;

  user.logout(authorizationString)
    .then(data => res.json(data))
    .catch(e => next(e));
}

/**
 * Change user password.
 *
 * @param req
 * @param res
 * @param next
 */
export function changePassword(req, res, next) {
  user.changePassword(req.body)
    .then(() => res.send('Password successfully changed'))
    .catch(e => next(e));
}

/**
 * Send reset password link.
 *
 * @param req
 * @param res
 * @param next
 */
export function forgotPassword(req, res, next) {
  let baseUrl = getBaseUrl(req);

  user.forgotPassword(req.body, baseUrl)
    .then(() => res.send('Successfully sent reset password link'))
    .catch(e => next(e));
}

/**
 * Reset user password.
 *
 * @param req
 * @param res
 * @param next
 */
export function resetPassword(req, res, next) {
  let token = req.params.token;
  let payload = req.body;

  user.resetPassword(token, payload)
    .then(() => res.send('Password reset successfully'))
    .catch(e => next(e));
}
