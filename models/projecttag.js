'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectTag = sequelize.define('ProjectTag', {
    projectId: {
      type: DataTypes.INTEGER,
      unique: 'projectTagIndex',
      primaryKey: true
    },
    tagId: {
      type: DataTypes.INTEGER,
      unique: 'projectTagIndex',
      primaryKey: true
    }
  }, {
    timestamps: false
  });

  ProjectTag.associate = function(models) {
  };

  return ProjectTag;
};