import bookshelf from 'bookshelf';
import camelize from 'bookshelf-camelcase';

import knex from './knex';

const instance = bookshelf(knex);

instance.plugin(camelize);

export default instance;
