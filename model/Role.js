import camelize from 'bookshelf-camelcase';
import bookshelf from '../../utils/bookshelf';

bookshelf.plugin(camelize);

class Role extends bookshelf.Model {
  get tableName() {
    return 'roles';
  }

  static fetchById(id) {
    return Role.where('id', id).fetch();
  }
}

export default Role;
