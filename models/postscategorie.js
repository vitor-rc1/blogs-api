const PostsCategorie = (sequelize, _DataTypes) => {
  const postsCategorie = sequelize.define('PostsCategorie', 
  {},
  { timestamps: false });

  postsCategorie.associate = (models) => {
    postsCategorie.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: postsCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    postsCategorie.belongsToMany(models.Categorie, {
      as: 'categories',
      through: postsCategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
};
  
  return postsCategorie;
};

module.exports = PostsCategorie;