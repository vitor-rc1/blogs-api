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
    const allPosts = await blogPostsService.getAllPosts();
    res.status(200).json(allPosts);
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

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await blogPostsService.getPostById(id);
    res.status(200).json(post);
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

const editBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, categoryIds } = req.body;

    const editedPost = await blogPostsService.editBlogPostById(title, content, categoryIds, id);
    res.status(200).json(editedPost);
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

const deleteBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;
    await blogPostsService.deleteBlogPostById(id);
    res.status(204).json();
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

const searchTermInPosts = async (req, res) => {
  try {
    const { q } = req.query;
    console.log(q, '-------------------------');
    const filteredPosts = await blogPostsService.searchTermInPosts(q);
    res.status(200).json(filteredPosts);
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
  createBlogPost,
  getAllPosts,
  getPostById,
  editBlogPostById,
  deleteBlogPostById,
  searchTermInPosts,
};