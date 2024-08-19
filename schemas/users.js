import Joi from 'joi'

export default {
  register: Joi.object({
    firstName: Joi.string().min(6).max(50).required().messages(),
    lastName: Joi.string().min(6).max(50).required().messages(),
    email: Joi.string().email().required().messages(),
    password: Joi.string().min(8).required().messages(),
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages(),
    password: Joi.string().min(8).required().messages(),
  }),

  updateUserProfile: Joi.object({
    firstName: Joi.string().min(6).max(50).required().messages(),
    lastName: Joi.string().min(6).max(50).required().messages(),
  }),

  deleteUser: Joi.object({
    password: Joi.string().min(8).required().messages(),
  }),
}
