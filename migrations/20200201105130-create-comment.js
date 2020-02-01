module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    projectId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Projects',
        },
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    userId: {
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
    queryInterface.addIndex('Comments', ['projectId']);
    queryInterface.addIndex('Comments', ['userId']);
  }),
  down: (queryInterface) => queryInterface.dropTable('Comments'),
};
