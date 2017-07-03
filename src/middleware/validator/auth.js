import boom from 'boom';
import * as auth from '../../utils/auth';
import * as authMsg from '../../constant/auth.json';

export async function validateToken(req, res, next) {
  try {
    if (!('authorization' in req.headers)) {
      throw boom.notAcceptable(authMsg.noAccessToken);
    }
    let length = req.headers.authorization.length;
    let authorizationString = req.headers.authorization;
    let accessToken = authorizationString.slice(7, length);

    await auth.validate(accessToken);
    next();
  } catch (err) {
    next(err);
  }
}

export async function validateRefreshToken(req, res, next) {
  try {

    if (!('refreshToken' in req.body)) {
      throw boom.notAcceptable(authMsg.noRefreshToken);
    }
    next();
  } catch (err) {
    next(err);
  }
}
