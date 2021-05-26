const Categorie = (sequelize, DataTypes) => {
  const categorie = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  categorie.associate = (models) => {
    categorie.hasMany(models.PostsCategorie,
    { foreignKey: 'categoryId', as: 'categories' });
};
  
  return categorie;
};

module.exports = Categorie;