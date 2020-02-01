'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    models.Tag.belongsToMany(models.Project, { through: 'ProjectTags' });
  };
  return Tag;
};