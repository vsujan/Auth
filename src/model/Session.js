import bookshelf from '../utils/bookshelf';

class Session extends bookshelf.Model {
  get tableName() {
    return 'sessions';
  }

  static fetchById(id) {
    return Session.where('id', id).fetch();
  }

  static fetchByToken(token) {
    return Session.where('refresh_token', token).fetch();
  }

  static fetchByUserId(userId) {
    return Session.where('user_id', userId).fetch();
  }
}

export default Session;
