'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    img: DataTypes.STRING
  }, {});

  Project.associate = function(models) {
    models.Project.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Project.belongsToMany(models.Tag, { through: 'ProjectTags' });
  };

  return Project;
};