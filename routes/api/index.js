const path = require('path');
const express = require('express');
const debug = require('debug')('express-sequelize:routes');
const { getDirFiles } = require('../../utils');
const baseApiRoutes = require('./baseApiRoutes');
const baseControllers = require('../../controllers/api');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true });
});

/**
 * Creates routers by scanning models directory and exclude routers
 * that were overriden in the current directory.
 *
 * @example [{ modelName: user, modelApiRouter: router }]
 * @param createRouter callback to create router
 *
 * @returns [{ modelName, modelApiRouter }]
 */
exports.getModelApiRouters = (createRouter) => {
  const modelRouterMap = [];
  const routerFiles = getDirFiles(__dirname, '.js');
  getDirFiles(
    path.join(__dirname, '../../models'),
    '.js',
    routerFiles,
    (filename) => {
      const modelName = path.basename(filename, '.js').toLowerCase();
      modelRouterMap.push({ modelName, modelApiRouter: createRouter(modelName) });
    },
  );

  return modelRouterMap;
};

const modelApiRouters = exports.getModelApiRouters(
  (modelName) => baseApiRoutes(baseControllers[modelName]),
);

// eslint-disable-next-line no-restricted-syntax
for (const modelApiRouterItem of modelApiRouters) {
  const { modelName, modelApiRouter } = modelApiRouterItem;
  debug(`Sets up /${modelName} route`);
  router.use(`/${modelName}`, modelApiRouter);
}

module.exports = router;
