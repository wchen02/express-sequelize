const express = require('express');
const { createObjectsFromModels, getDebugger } = require('../../utils');
const baseApiRoutes = require('./baseApiRoutes');
const baseApiControllers = require('../../controllers/api');

const debug = getDebugger(__filename);
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true });
});

const modelApiRouters = createObjectsFromModels(
  (modelName) => baseApiRoutes(baseApiControllers[modelName]),
);

// eslint-disable-next-line no-restricted-syntax
for (const modelApiRouterItem of modelApiRouters) {
  const { name, object } = modelApiRouterItem;
  debug(`Sets up /api/${name} route`);
  router.use(`/${name}`, object);
}

module.exports = router;
