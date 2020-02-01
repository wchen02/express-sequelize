'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProjectTags', {
      projectId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Projects"
          },
          key: 'id'
        }
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Tags"
          },
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProjectTags');
  }
};