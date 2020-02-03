const baseController = require('./baseController');

let mockedRows;
const mockFindAndCountAll = jest.fn();

const mockedModel = {
  findAndCountAll: async () => {
    mockFindAndCountAll();
    return { rows: mockedRows };
  },
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

afterEach(() => {
  mockedRows = undefined;
});

describe('controller', () => {
  const controller = baseController(mockedModel);
  it('should get all resources', async () => {
    mockedRows = 1;
    const rows = await controller.getAll();
    expect(rows).toEqual(1);
    expect(mockFindAndCountAll).toBeCalledTimes(1);
  });

  it('should get resource', async () => {
    const testId = 1;
    await controller.get(testId);
    expect(mockedModel.findByPk).toBeCalledTimes(1);
    expect(mockedModel.findByPk).toBeCalledWith(testId);
  });

  it('should create resource', async () => {
    const testData = { dummy: true };
    await controller.create(testData);
    expect(mockedModel.create).toBeCalledTimes(1);
    expect(mockedModel.create).toBeCalledWith(testData);
  });

  it('should update resource', async () => {
    const testId = 1;
    const testData = { dummy: true };
    await controller.update(testId, testData);
    expect(mockedModel.update).toBeCalledTimes(1);
    expect(mockedModel.update).toBeCalledWith(testData, { where: { id: testId } });
  });

  it('should delete resource', async () => {
    const testId = 1;
    await controller.delete(testId);
    expect(mockedModel.destroy).toBeCalledTimes(1);
    expect(mockedModel.destroy).toBeCalledWith({ where: { id: testId } });
  });
});
