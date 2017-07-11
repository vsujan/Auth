import dotenv from 'dotenv';

dotenv.config();

export default {
    auth: {
        saltRounds: process.env.SALT_ROUNDS || 11,
        accessTokenExpiry: process.env.ACCESS_TOKEN_DURATION || 300000,
        refreshTokenExpiry: process.env.REFRESH_TOKEN_DURATION || 86400000,
        accessTokenSalt: process.env.ACCESS_TOKEN_SALT || 'authenTICaTION',
        refreshTokenSalt: process.env.REFRESH_TOKEN_SALT || 'authenTICaTION'
    },
    database: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: 'utf8'
    }
  },
}
