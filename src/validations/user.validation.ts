import Joi from "joi";
import { UserRole } from "../constants/appConstants";

export const validateUser = (user) => {
  const Schema = Joi.object().keys({
    firstName: Joi.string().max(30).required(),
    lastName: Joi.string().max(30).required(),
    email: Joi.string().email().max(50).required(),
    countryCode: Joi.string()
      .min(1)
      .max(4)
      .pattern(/^[0-9]+$/)
      .required(),
    mobileNumber: Joi.string()
      .min(8)
      .max(11)
      .pattern(/^[0-9]+$/)
      .required(),
    address: Joi.string().required(),
    role: Joi.string()
      .valid(...Object.values(UserRole))
      .optional(),
    password: Joi.string().min(7).required(),
  });

  return Schema.validate(user);
};

export const validateLogin = (user) => {
  const Schema = Joi.object().keys({
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(7).required(),
  });

  return Schema.validate(user);
};
