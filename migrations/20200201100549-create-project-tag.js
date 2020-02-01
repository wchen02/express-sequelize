'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProjectTags', {
      projectId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Projects"
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        primaryKey: true
      },
      tagId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Tags"
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        primaryKey: true
      }
    }).then(() => {
      queryInterface.addIndex('ProjectTags', ['projectId']);
      queryInterface.addIndex('ProjectTags', ['tagId']);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProjectTags');
  }
};