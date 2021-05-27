const blogPostsService = require('../services/blogPostsService');

const createBlogPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    const newPost = await blogPostsService.createBlogPost(title, content, categoryIds, id);
    res.status(201).json(newPost);
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

const getAllPosts = async (req, res) => {
  try {
    const users = await blogPostsService.getAllPosts();
    res.status(200).json(users);
  } catch (error) {
    const { message, code } = error;
    res.status(code).json({
      message,
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await blogPostsService.getPostById(id);
    res.status(200).json(users);
  } catch (error) {
    const { message, code } = error;
    res.status(code).json({
      message,
    });
  }
};

module.exports = {
  createBlogPost,
  getAllPosts,
  getPostById,
};