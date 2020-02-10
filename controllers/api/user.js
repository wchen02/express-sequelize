const { getDebugger } = require('../../utils');
const baseApiController = require('./baseApiController');
const models = require('../../models');
const debug = getDebugger(__filename);

const userController = baseApiController(models.User);
module.exports = baseApiControllers;
