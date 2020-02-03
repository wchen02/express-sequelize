module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    description: DataTypes.STRING,
  }, {});

  Comment.associate = (models) => {
    models.Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
      },
    });
    models.Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Comment;
};
