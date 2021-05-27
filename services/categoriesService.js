const joi = require('joi');
const { Categorie } = require('../models');
const InvalidEntries = require('../customErrors/invalidEntries');

const schemaCreateCategorie = joi.object({
  name: joi.string().required(),
});

const validateInputs = (inputs, schema) => {
  const { error } = schema.validate(inputs);
  if (error) {
    const { details: [{ message }] } = error;
    throw new InvalidEntries(message, 400);
  }
};

const createCategory = async (name) => {
  validateInputs({ name }, schemaCreateCategorie); 
  return Categorie.create({ name });
};

const getAllCategories = async () => Categorie.findAll();

module.exports = {
  createCategory,
  getAllCategories,
};