import * as auth from '../service/auth';

/**
 * Generate new access token.
 *
 * @param req
 * @param res
 * @param next
 */
export function getNewAccessToken(req, res, next) {
  auth.generateNewToken(req.body.refreshToken)
    .then(accessToken => res.json({ accessToken }))
    .catch(err => next(err));
}
