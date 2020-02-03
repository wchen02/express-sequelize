module.exports = (model) => ({
  getAll: async () => {
    const { rows } = await model.findAndCountAll({
      offset: 0,
      limit: 10,
    });

    return rows;
  },

  get: async (id) => model.findByPk(id),

  create: async (data) => model.create(data),

  update: async (id, data) => model.update(data, {
    where: { id },
  }),

  delete: async (id) => model.destroy({
    where: { id },
  }),
});
