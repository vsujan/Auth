import * as user from '../service/user';

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
  let refreshToken = req.body.refreshToken;

  user.logout(refreshToken)
    .then(data => res.json(data))
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
  user.resetPassword(req.body)
    .then(() => res.send('Password successfully changed'))
    .catch(e => next(e));
}
