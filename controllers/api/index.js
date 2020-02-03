const baseController = require('./baseController');
const models = require('../../models');

const baseControllers = {};

/**
 * Set up api controller for models
 */
// eslint-disable-next-line no-restricted-syntax
for (const [modelName, model] of Object.entries(models)) {
  if (modelName.toLowerCase() !== 'sequelize') {
    baseControllers[modelName.toLowerCase()] = baseController(model);
  }
}

module.exports = baseControllers;
