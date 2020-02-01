'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    img: DataTypes.STRING
  }, {});

  Project.associate = function(models) {
    models.Project.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    models.Project.belongsToMany(models.Tag, { through: 'ProjectTags' });
    models.Project.hasMany(models.Comment);
  };

  return Project;
};