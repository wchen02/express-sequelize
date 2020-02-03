module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
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
    },
    UserId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }).then(() => {
    queryInterface.addIndex('Comments', ['PostId']);
    queryInterface.addIndex('Comments', ['UserId']);
  }),
  down: (queryInterface) => queryInterface.dropTable('Comments'),
};
