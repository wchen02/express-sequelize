module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('PostTags', {
    postId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Posts',
        },
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
      primaryKey: true,
    },
    tagId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Tags',
        },
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
      primaryKey: true,
    },
  }).then(() => {
    queryInterface.addIndex('PostTags', ['postId']);
    queryInterface.addIndex('PostTags', ['tagId']);
  }),
  down: (queryInterface) => queryInterface.dropTable('PostTags'),
};
