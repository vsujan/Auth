import bookshelf from '../utils/bookshelf';

class Role extends bookshelf.Model {
  get tableName() {
    return 'roles';
  }

  static fetchById(id) {
    return Role.where('id', id).fetch();
  }
}

export default Role;
