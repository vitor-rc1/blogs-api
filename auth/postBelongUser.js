const { BlogPost } = require('../models');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  try {
    const blogPost = await BlogPost.findOne({ where: { id } });
  
    if (blogPost.userId !== userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
  
  next();
};