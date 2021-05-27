const express = require('express');
const usersController = require('../controllers/usersController');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router
  .route('/user')
  .get(validateJWT, usersController.getAllUsers)
  .post(usersController.createUser);

router
.route('/user/me')
.delete(validateJWT, usersController.deleteUser);

router
.route('/user/:id')
.get(validateJWT, usersController.getUserById);

router.post('/login', usersController.login);

module.exports = router;