module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    img: DataTypes.STRING,
  }, {});

  Post.associate = (models) => {
    models.Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    models.Post.belongsToMany(models.Tag, { through: 'PostTags' });
    models.Post.hasMany(models.Comment);
  };

  return Post;
};
