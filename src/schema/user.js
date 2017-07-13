import Joi from 'joi';

export const loginSchema = {
  email: Joi.string().email().max(50),
  password: Joi.string().min(8).max(12)
};

export const registerSchema = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: loginSchema.email,
  password: loginSchema.password
};

export const forgotPasswordSchema = {
  email: loginSchema.email
};

export const resetPasswordSchema = {
  newPassword: loginSchema.password
};

export const changePasswordSchema = {
  email: loginSchema.email,
  oldPassword: loginSchema.password,
  newPassword: loginSchema.password
};
