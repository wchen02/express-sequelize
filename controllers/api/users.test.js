const { sequelize, User } = require('../../models');
const controller = require('./users');

const model = User;
afterAll((done) => {
  sequelize.close();
  done();
});

describe('controller', () => {
  describe('get all resources', () => {
    it('should return on success', async () => {
      const expectedResources = await model.findAll();
      const actualResources = await controller.getAll();
      expect(actualResources).toEqual(expectedResources);
    });
  });
});
