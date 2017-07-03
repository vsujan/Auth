import bookshelf from '../utils/bookshelf';

export const USER_ADMIN = 1;
export const USER_SERVICE_PROVIDER = 2;

class User extends bookshelf.Model {
  get tableName() {
    return 'users';
  }

  static fetchByEmail(email) {
    return User.where('email', email).fetch();
  }

  static fetchById(id) {
    return User.where('id', id).fetch();
  }

  static updateById(id, params) {
    return User.where('id', id).save(params, { method: 'update' });
  }
}

export default User;
