module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {});

  Tag.associate = (models) => {
    models.Tag.belongsToMany(models.Post, { through: 'PostTags' });
  };

  return Tag;
};
