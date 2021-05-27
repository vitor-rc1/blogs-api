const express = require('express');
const blogPostsController = require('../controllers/blogPostsController');
const postBelongUser = require('../auth/postBelongUser');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router
  .route('/post')
  .get(validateJWT, blogPostsController.getAllPosts)
  .post(validateJWT, blogPostsController.createBlogPost);

router
.route('/post/search')
.get(validateJWT, blogPostsController.searchTermInPosts);

router
.route('/post/:id')
.get(validateJWT, blogPostsController.getPostById)
.put(validateJWT, postBelongUser, blogPostsController.editBlogPostById)
.delete(validateJWT, postBelongUser, blogPostsController.deleteBlogPostById);

module.exports = router;