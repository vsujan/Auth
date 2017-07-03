import boom from 'boom';
import HttpStatus from 'http-status-codes';
import * as jwt from './jwt';
import auth from '../constant/auth.json';

export function validate(token) {
  try {
    return jwt.verifyAccessToken(token);
  } catch (err) {
    if (err.name === auth.tokenExpired) {
      throw boom.create(HttpStatus.UNAUTHORIZED, auth.tokenExpiredMsg);
    }
    throw boom.create(HttpStatus.UNAUTHORIZED, auth.invalidTokenMsg);
  }
}
