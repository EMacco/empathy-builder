import Joi from 'joi';
import validateSchema from '../helpers/validateSchema';

export const validateLogin = (user) => {
  const schema = {
    email: Joi.string().trim().lowercase().min(5)
      .max(255)
      .email()
      .required(),
    password: Joi.string().trim().min(5).max(255)
      .required()
  };

  return validateSchema(user, schema);
};

export const validateSignup = (user) => {
  const schema = {
    firstname: Joi.string().trim().lowercase().min(2)
      .max(10)
      .required(),
    lastname: Joi.string().trim().lowercase().min(2)
      .max(10)
      .required(),
    phone: Joi.string().trim().lowercase().min(11)
      .max(14)
      .required(),
    email: Joi.string().trim().lowercase().min(5)
      .max(255)
      .email()
      .required(),
    password: Joi.string().trim().min(5).max(255)
      .required()
  };

  return validateSchema(user, schema);
};
