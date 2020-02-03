const express = require('express');
const validator = require('validator');

module.exports = (controller) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const rows = await controller.getAll();
    res.json(rows);
  });

  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!validator.isInt(id, { min: 1 })) {
      res.sendStatus(400);
    }

    const resource = await controller.get(id);

    if (resource) {
      res.json(resource);
    } else {
      res.sendStatus(404);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const resource = await controller.create(req.body);

      res.json(resource);
    } catch (err) {
      res.status(400).json({
        err,
      });
    }
  });

  const update = async (req, res) => {
    const { id } = req.params;
    if (!validator.isInt(id, { min: 1 })) {
      res.sendStatus(400);
    }

    try {
      // destructure id into _ and rest of the body into body
      const { id: _, ...data } = req.body;
      const rows = await controller.update(id, data);

      res.json({ rows });
    } catch (err) {
      res.status(400).json({
        err,
      });
    }
  };

  router.put('/:id', update);

  router.patch('/:id', update);

  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!validator.isInt(id, { min: 1 })) {
      res.sendStatus(400);
    }

    try {
      const rows = await controller.destroy(id);

      res.json({ rows });
    } catch (err) {
      res.status(400).json({
        err,
      });
    }
  });

  return router;
};
