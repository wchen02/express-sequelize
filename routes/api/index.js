const express = require('express');
const debug = require('debug')('express-sequelize:routes');
const { createObjectsFromModels } = require('../../utils');
const baseApiRoutes = require('./baseApiRoutes');
const baseControllers = require('../../controllers/api');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true });
});

const modelApiRouters = createObjectsFromModels(
  (modelName) => baseApiRoutes(baseControllers[modelName]),
);

// eslint-disable-next-line no-restricted-syntax
for (const modelApiRouterItem of modelApiRouters) {
  const { name, object } = modelApiRouterItem;
  debug(`Sets up /${name} route`);
  router.use(`/${name}`, object);
}

module.exports = router;
