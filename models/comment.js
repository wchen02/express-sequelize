'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    projectId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});

  Comment.associate = function(models) {
    models.Comment.belongsTo(models.Project, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Comment.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Comment;
};