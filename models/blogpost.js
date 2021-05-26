const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    displayName: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    timestamps: false,
  });
  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User,
    { foreignKey: 'userId', as: 'users' });
};
  return blogPost;
};

module.exports = BlogPost;