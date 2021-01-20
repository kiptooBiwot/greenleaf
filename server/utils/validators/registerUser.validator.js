const Joi = require('joi')

const registerUserSchema = Joi.object({
    username: Joi.string().required().trim().lowercase().alphanum(),
    password: Joi.string().trim().required().min(6),
    role: Joi.string().required().trim()
})

const loginUserSchema = Joi.object({
    username: Joi.string().required().trim().lowercase().alphanum(),
    password: Joi.string().trim().required().min(6)
})

module.exports = {
    registerUserSchema,
    loginUserSchema
}