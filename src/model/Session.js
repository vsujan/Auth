import camelize from 'bookshelf-camelcase';
import bookshelf from '../utils/bookshelf';

bookshelf.plugin(camelize);

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
}

export default Session;
