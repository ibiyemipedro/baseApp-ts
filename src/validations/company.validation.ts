import Joi from "joi";

export const validateCompany = (company) => {
  const Schema = Joi.object().keys({
    name: Joi.string().max(70).required(),
    email: Joi.string().email().optional(),
    logoUrl: Joi.string().max(70).optional(),
    countryCode: Joi.string()
      .min(1)
      .max(4)
      .pattern(/^[0-9]+$/)
      .optional(),
    mobileNumber: Joi.string()
      .min(8)
      .max(11)
      .pattern(/^[0-9]+$/)
      .optional(),
    address: Joi.string().optional(),
    companySize: Joi.string().optional(),
    domain: Joi.string().max(70).optional(),
    state: Joi.string().max(70).optional(),
    country: Joi.string().max(70).optional(),
    ownerId: Joi.number().optional(),
  });

  return Schema.validate(company);
};
