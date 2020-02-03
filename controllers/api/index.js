const { createObjectsFromModels, getDebugger } = require('../../utils');
const baseController = require('./baseController');
const models = require('../../models');

const debug = getDebugger(__filename);
const baseControllers = {};

/**
 * Create controllers from model names
 */
const modelApiControllers = createObjectsFromModels(
  (lowerCaseModelName) => {
    const modelNames = Object.keys(models);
    // in case model name is multi-words, find the real name from models
    // ex: posttag => PostTag
    const realModelName = modelNames.reduce(
      (prevName, name) => (name.toLowerCase() === lowerCaseModelName ? name : prevName),
    );

    return baseController(models[realModelName]);
  },
);

// eslint-disable-next-line no-restricted-syntax
for (const modelApiRouterItem of modelApiControllers) {
  const { name, object } = modelApiRouterItem;
  debug(`Sets up ${name} api controller`);
  baseControllers[name] = object;
}

module.exports = baseControllers;
