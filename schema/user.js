import Joi from 'joi';

export const loginSchema = {
  email: Joi.string().email().max(50),
  password: Joi.string().min(8).max(12)
};

export const userDetail = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: loginSchema.email,
  password: loginSchema.password
};
