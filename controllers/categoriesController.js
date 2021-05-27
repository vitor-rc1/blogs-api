const categoriesService = require('../services/categoriesService');

const createCategorie = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await categoriesService.createCategory(name);
    res.status(201).json(newCategory);
  } catch (error) {
    const { message, code } = error;
    if (code) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(500).json({
      message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoriesService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    const { message, code } = error;
    if (code) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(500).json({
      message,
    });
  }
};

module.exports = {
  createCategorie,
  getAllCategories,
};