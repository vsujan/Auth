import knex from 'src/utils/knex';
import config from '../config/config';

export default knex(config.database);
