const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router
  .route('/categories')
  .get(validateJWT, categoriesController.getAllCategories)
  .post(validateJWT, categoriesController.createCategorie);

module.exports = router;