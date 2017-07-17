import dotenv from 'dotenv';

dotenv.config();

export default {
    logging: {
        level: process.env.LOGGING_LEVEL || 'info',
        path: process.env.LOGGING_DIR || 'logs'
    },
    auth: {
        saltRounds: process.env.SALT_ROUNDS || 11,
        accessTokenExpiry: process.env.ACCESS_TOKEN_DURATION || 300000,
        refreshTokenExpiry: process.env.REFRESH_TOKEN_DURATION || 86400000,
        accessTokenSalt: process.env.ACCESS_TOKEN_SALT || 'authenTICaTION',
        refreshTokenSalt: process.env.REFRESH_TOKEN_SALT || 'authenTICaTION',
        forgotPasswordExpiry: process.env.FORGOT_PASSWORD_TOKEN_DURATION || 300000,
        forgotPasswordSalt: process.env.FORGOT_PASSWORD_TOKEN_SALT || 'forgotpassword',
        registerSalt: process.env.REGISTER_TOKEN_SALT || 'registerUser'
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
    ses: {
        accessKey: process.env.ACCESS_KEY,
        secretKey: process.env.SECRET_KEY,
        senderAddress: process.env.SENDER_ADDRESS,
        mailSubject: process.env.EMAIL_SUBJECT,
        mailFooter: process.env.EMAIL_FOOTER,
        errorMail: 'error',
        helpMail: 'help',
        resetPasswordMail: 'reset',
        verifyUserMail: 'verify'
    }
}
