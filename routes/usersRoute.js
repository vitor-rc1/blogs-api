const express = require('express');
const usersController = require('../controllers/usersController');
const validateJWT = require('../auth/validateJWT');
// const validateAdmin = require('../auth/validateAdmin');

const router = express.Router();

router
  .route('/user')
  .get(validateJWT, usersController.getAllUsers)
  .post(usersController.createUser);

router
.route('/user/:id')
.get(validateJWT, usersController.getUserById);

router.post('/login', usersController.login);

// router.post('/users/admin', validateJWT, validateAdmin, usersController.createAdmin);

module.exports = router;