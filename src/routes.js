import express from 'express';
import * as user from './controller/user';
import * as auth from './controller/auth';
import { validateLogin } from './middleware/validator/user';
import * as authValidator from './middleware/validator/auth';

const router = express.Router();

router.post('/login', validateLogin, user.login);
router.post('/refresh', authValidator.validateRefreshToken, auth.getNewAccessToken);
router.post('/logout', authValidator.validateRefreshToken, user.logout);
router.put('/resetPassword', validateResetPassword, authValidator.validateToken, user.resetPassword);
router.get('/validateToken', authValidator.validateToken, auth.validateToken);

export default router;
