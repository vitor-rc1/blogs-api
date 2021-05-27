const express = require('express');
const blogPostsController = require('../controllers/blogPostsController');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router
  .route('/post')
  .get(validateJWT, blogPostsController.getAllPosts)
  .post(validateJWT, blogPostsController.createBlogPost);

router
.route('/post/:id')
.get(validateJWT, blogPostsController.getPostById);

module.exports = router;