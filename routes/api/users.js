const baseApiRoutes = require('./baseApiRoutes');
const controller = require('../../controllers/api/users');

const router = baseApiRoutes(controller);
module.exports = router;
