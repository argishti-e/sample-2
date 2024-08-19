import Joi from 'joi'

export default {
  getSinglePost: Joi.object({
    id: Joi.number().integer().required(),
  }),

  createPost: Joi.object({
    title: Joi.string().min(3).max(100).required().messages(),
    description: Joi.string().min(3).max(5000).required().messages(),
  }),

  updatePost: Joi.object({
    id: Joi.number().integer().required(),
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(100).required(),
  }),

  deletePost: Joi.object({
    id: Joi.number().integer().required(),
  }),
}
