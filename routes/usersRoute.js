const express = require('express');
const usersController = require('../controllers/usersController');
// const validateJWT = require('../auth/validateJWT');
// const validateAdmin = require('../auth/validateAdmin');

const router = express.Router();

router
  .route('/user')
  .post(usersController.createUser);

router.post('/login', usersController.login);

// router.post('/users/admin', validateJWT, validateAdmin, usersController.createAdmin);

module.exports = router;