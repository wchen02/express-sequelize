const baseController = require('./baseController');
const model = require('../../models').User;

const controller = baseController(model);
module.exports = controller;
