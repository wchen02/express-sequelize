module.exports = (sequelize, DataTypes) => {
  const PostTag = sequelize.define('PostTag', {
    postId: {
      type: DataTypes.INTEGER,
      unique: 'postTagIndex',
      primaryKey: true,
    },
    tagId: {
      type: DataTypes.INTEGER,
      unique: 'postTagIndex',
      primaryKey: true,
    },
  }, {
    timestamps: false,
  });

  return PostTag;
};
