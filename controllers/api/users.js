const { User } = require('../../models');

exports.getAll = async (req, res) => {
  const { rows } = await User.findAndCountAll({
    offset: 0,
    limit: 10,
  });

  res.json(rows);
};

exports.get = async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id, 10))) {
    res.sendStatus(400);
  }

  const user = await User.findByPk(id);

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

exports.create = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.json(user);
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id, 10))) {
    res.sendStatus(400);
  }

  // destructure id into _ and rest of the body into body
  const { id: _, ...data } = req.body;

  try {
    const rows = await User.update(data, {
      where: { id },
    });

    res.json({ rows });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id, 10))) {
    res.sendStatus(400);
  }

  try {
    const rows = await User.destroy({
      where: { id },
    });

    res.json({ rows });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
