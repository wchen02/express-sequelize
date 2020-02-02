const model = require('../../models').User;

exports.getAll = async () => {
  const { rows } = await model.findAndCountAll({
    offset: 0,
    limit: 10,
  });

  return rows;
};

exports.get = async (id) => model.findByPk(id);

exports.create = async (data) => model.create(data);

exports.update = async (id, data) => model.update(data, {
  where: { id },
});

exports.delete = async (id) => model.destroy({
  where: { id },
});
