const createError = require("http-errors");
const Employee = require('../models/Employee.model')
const {
  registerUserSchema,
  loginUserSchema,
} = require("../utils/validators/registerUser.validator");
const { signAccessToken, signRefreshToken } = require('../utils/jwt_util')

module.exports.getUsers = async (req, res, next) => {
  res.send("Get all users");
};

module.exports.registerUser = async (req, res, next) => {
  try {
    // Validate user from req.body
    const validatedUser = await registerUserSchema.validateAsync(req.body);

    // check if employee exists
    const dbUser = await Employee.findOne({ username: validatedUser.username })
    if (dbUser) throw createError.Conflict(`${validatedUser.username} is already taken.`)

    const employee = new Employee({
      username: validatedUser.username,
      password: validatedUser.password,
      role: validatedUser.role
    })
    // console.log(employee)

    const savedEmployee = await employee.save()

    // console.log(`Saved user: ${savedEmployee}`)

    // Generate tokens
    const accessToken = await signAccessToken(savedEmployee)
    const refreshToken = await signRefreshToken(savedEmployee)

    res.send({
      message: 'You have been registered successfully',
      accessToken,
      refreshToken
    })

  } catch (error) {
    next(error);
  }
};
