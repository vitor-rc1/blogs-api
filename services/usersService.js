const joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const InvalidEntries = require('../customErrors/invalidEntries');

const { secret } = require('../auth/secret.json');

const validateUserInput = (displayName, email, password, image) => {
  const schema = joi.object({
    displayName: joi.string().min(8).required(),
    email: joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'br'] } })
      .required(),
    password: joi.string().length(6).required(),
    image: joi.string().required(),
  });
  const { error } = schema.validate({ displayName, email, password, image });
  if (error) {
    const { details: [{ message }] } = error;
    throw new InvalidEntries(message, 400);
  }
};

const isEmailExist = async (email) => {
  const emailResult = await User.findOne({ where: { email } });
  if (emailResult) {
    throw new InvalidEntries('User already registered', 409);
  }
};

const login = async (emailInput, passwordInput) => {
  if (!emailInput || !passwordInput) {
    throw new InvalidEntries('All fields must be filled', 401);
  }
  
  const user = await User.findOne({ where: { email: emailInput } });
  if (!user || user.password !== passwordInput) {
    throw new InvalidEntries('Incorrect username or password', 401);
  } 
  
  const { id, displayName, email } = user;
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  const token = jwt.sign({ id, email, displayName }, secret, jwtConfig);
  
  return { token };
};

const createUser = async (displayName, email, password, image) => {
  validateUserInput(displayName, email, password, image);
  await isEmailExist(email);
  await User.create({ displayName, email, password, image });
  return login(email, password);
};

module.exports = {
  createUser,
  login,
};