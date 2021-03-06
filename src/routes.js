import express from 'express';
import * as user from './controller/user';
import * as auth from './controller/auth';
import * as userValidator from './middleware/validator/user';
import * as authValidator from './middleware/validator/auth';

const router = express.Router();

router.post('/register', userValidator.validateRegister, user.register);
router.patch('/verify/:token', user.verify);
router.post('/login', userValidator.validateLogin, user.login);
router.post('/refresh', authValidator.validateRefreshToken, auth.getNewAccessToken);
router.delete('/logout', authValidator.validateToken, authValidator.validateRefreshToken, user.logout);
router.post('/forgotPassword', userValidator.validateForgotPassword, user.forgotPassword);
router.post('/resetPassword/:token', userValidator.validateResetPassword, user.resetPassword);
router.put('/changePassword', userValidator.validateChangePassword, authValidator.validateToken, user.changePassword);
router.get('/validateToken', authValidator.validateToken, auth.validateToken);
