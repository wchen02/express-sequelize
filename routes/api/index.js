const express = require('express');
const usersRouter = require('./users');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true });
});

router.use('/users', usersRouter);

module.exports = router;
