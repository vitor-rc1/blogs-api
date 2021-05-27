const PostsCategorie = (sequelize, _DataTypes) => {
  const postsCategorie = sequelize.define('PostsCategorie', 
  {},
  { timestamps: false });

  postsCategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: postsCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: postsCategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
};
  
  return postsCategorie;
};

module.exports = PostsCategorie;