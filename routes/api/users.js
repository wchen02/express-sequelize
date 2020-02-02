const express = require('express');
const usersApi = require('../../controllers/api/users');

const router = express.Router();

router.get('/', usersApi.getAll);
router.get('/:id', usersApi.get);
router.post('/', usersApi.create);
router.put('/:id', usersApi.update);
router.patch('/:id', usersApi.update);
router.delete('/:id', usersApi.delete);

module.exports = router;
