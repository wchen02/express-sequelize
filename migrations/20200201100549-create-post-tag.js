module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('PostTags', {
    PostId: {
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
    TagId: {
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
    queryInterface.addIndex('PostTags', ['PostId']);
    queryInterface.addIndex('PostTags', ['TagId']);
  }),
  down: (queryInterface) => queryInterface.dropTable('PostTags'),
};
