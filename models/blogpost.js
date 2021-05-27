const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  {
    updatedAt: 'published',
    createdAt: 'updated',
  });
  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User,
    { foreignKey: 'userId', as: 'users' });
    blogPost.hasMany(models.PostsCategorie,
      { foreignKey: 'postId', as: 'posts' });
};
  return blogPost;
};

module.exports = BlogPost;