import bookshelf from '../utils/bookshelf';

class UserToken extends bookshelf.Model {
  get tableName() {
    return 'user_tokens';
  }

  static fetchByUserId(id) {
    return UserToken.where('user_id', id).fetch();
  }

  static fetchById(id) {
    return UserToken.where('id', id).fetch();
  }

  static fetchByToken(token) {
    return UserToken.where('token', token).fetch();
  }

}

export default UserToken;
