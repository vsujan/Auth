import dotenv from 'dotenv';

dotenv.config();

export default {
    auth: {
        saltRounds: process.env.SALT_ROUNDS || 11,
        accessTokenExpiry: process.env.ACCESS_TOKEN_DURATION || 300000,
        refreshTokenExpiry: process.env.REFRESH_TOKEN_DURATION || 86400000,
        accessTokenSalt: process.env.ACCESS_TOKEN_SALT || 'northSeattle',
        refreshTokenSalt: process.env.REFRESH_TOKEN_SALT || 'northSeattleNetwork'
    }
}
