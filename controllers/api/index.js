const { createObjectsFromModels, getDebugger } = require('../../utils');
const baseController = require('./baseController');
const models = require('../../models');

const debug = getDebugger(__filename);
const baseControllers = {};

const modelApiControllers = createObjectsFromModels(
  (modelName) => {
    const newModelName = modelName[0].toUpperCase() + modelName.substring(1);
    return (newModelName in models) ? baseController(models[newModelName]) : null;
  },
);

// eslint-disable-next-line no-restricted-syntax
for (const modelApiRouterItem of modelApiControllers) {
  const { name, object } = modelApiRouterItem;
  debug(`Sets up ${name} api controller`);
  baseControllers[name] = object;
}

module.exports = modelApiControllers;
