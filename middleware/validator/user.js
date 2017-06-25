import * as schema from '../../schema/user';
import * as validator from '../../utils/';

/**
 * Validate a request body against a schema.
 *
 * @param req
 * @param res
 * @param next
 */
export function validateLogin(req, res, next) {
  const user = req.body;

  return validator.validate(user, schema.loginSchema)
    .then(() => next())
    .catch(err => next(err));
}
