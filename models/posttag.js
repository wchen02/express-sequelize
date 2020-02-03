module.exports = (sequelize, DataTypes) => {
  const PostTag = sequelize.define('PostTag', {
    PostId: {
      type: DataTypes.INTEGER,
      unique: 'postTagIndex',
      primaryKey: true,
    },
    TagId: {
      type: DataTypes.INTEGER,
      unique: 'postTagIndex',
      primaryKey: true,
    },
  }, {
    timestamps: false,
  });

  return PostTag;
};
