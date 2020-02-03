const fs = require('fs');
const path = require('path');
const express = require('express');
const baseApiRoutes = require('./baseApiRoutes');
const baseControllers = require('../../controllers/api');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true });
});

/**
 * Set up CRUD endpoints api router for models
 */
fs
  .readdirSync(path.join(__dirname, '../../models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = path.basename(file, '.js').toLowerCase();
    const modelRouter = baseApiRoutes(baseControllers[model]);
    router.use(`/${model}`, modelRouter);
  });

module.exports = router;
