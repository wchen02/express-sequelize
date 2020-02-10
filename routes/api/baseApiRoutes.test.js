const baseApiRoutes = require('./baseApiRoutes');

const mockedList = jest.fn();
const mockedGet = jest.fn();
const mockedCreate = jest.fn();
const mockedUpdate = jest.fn();
const mockedDestroy = jest.fn();
let mockedListResp;
let mockedGetResp;
let mockedCreateResp;
let mockedUpdateResp;
let mockedDestroyResp;
let mockedCreateParams;

const mockedController = {
  list: () => {
    mockedList();
    return mockedListResp;
  },
  get: () => {
    mockedGet();
    return mockedGetResp;
  },
  create: () => {
    mockedCreate(mockedCreateParams);
    return mockedCreateResp;
  },
  update: () => {
    mockedUpdate();
    return mockedUpdateResp;
  },
  destroy: () => {
    mockedDestroy();
    return mockedDestroyResp;
  },
};

const mockedStatus = jest.fn();
const mockedRes = {
  json: jest.fn(),
  sendStatus: jest.fn(),
};
mockedRes.status = (args) => {
  mockedStatus(args);
  return mockedRes;
};

describe('baseApiRoutes', () => {
  const router = baseApiRoutes(mockedController);

  afterEach(() => {
    jest.clearAllMocks();
    mockedListResp = undefined;
    mockedGetResp = undefined;
    mockedCreateResp = undefined;
    mockedUpdateResp = undefined;
    mockedDestroyResp = undefined;
    mockedCreateParams = undefined;
  });

  describe('list', () => {
    it('should get all resources', async () => {
      mockedListResp = [{ dummy: true }];

      await router({
        method: 'GET',
        url: '/',
      }, mockedRes);

      expect(mockedList).toBeCalledTimes(1);
      expect(mockedRes.json).toBeCalledTimes(1);
      expect(mockedRes.json).toBeCalledWith(mockedListResp);
    });

    it('should return 500 on error', async () => {
      mockedList.mockImplementation(() => {
        throw new Error('no good');
      });

      await router({
        method: 'GET',
        url: '/',
      }, mockedRes);

      expect(mockedList).toBeCalledTimes(1);
      expect(mockedRes.sendStatus).toBeCalledTimes(1);
      expect(mockedRes.sendStatus).toBeCalledWith(500);
    });
  });

  describe('get', () => {
    it('should return successfully with valid params', async () => {
      mockedGetResp = { dummy: true };

      await router({
        method: 'GET',
        url: '/3',
      }, mockedRes);

      expect(mockedGet).toBeCalledTimes(1);
      expect(mockedRes.json).toBeCalledTimes(1);
      expect(mockedRes.json).toBeCalledWith(mockedGetResp);
    });

    it('should return 400 with invalid params 3a', async () => {
      await router({
        method: 'GET',
        url: '/3a',
      }, mockedRes);

      expect(mockedGet).toBeCalledTimes(1);
      expect(mockedRes.sendStatus).toBeCalledWith(400);
    });

    it('should return 400 with invalid params -3', async () => {
      await router({
        method: 'GET',
        url: '/-3',
      }, mockedRes);

      expect(mockedGet).toBeCalledTimes(1);
      expect(mockedRes.sendStatus).toBeCalledWith(400);
    });

    it('should return 404 when lookup fails', async () => {
      mockedGetResp = null;

      await router({
        method: 'GET',
        url: '/3',
      }, mockedRes);

      expect(mockedGet).toBeCalledTimes(1);
      expect(mockedRes.sendStatus).toBeCalledWith(404);
    });
  });

  describe('post', () => {
    it('should create resource', async () => {
      mockedCreateParams = { dummy: 'params' };
      mockedCreateResp = { dummy: true };

      await router({
        method: 'POST',
        url: '/',
      }, mockedRes);

      expect(mockedCreate).toBeCalledTimes(1);
      expect(mockedCreate).toBeCalledWith(mockedCreateParams);
      expect(mockedRes.json).toBeCalledTimes(1);
      expect(mockedRes.json).toBeCalledWith(mockedCreateResp);
    });

    it('should return 400 when error creating', async () => {
      mockedCreateParams = { dummy: 'params' };
      mockedCreateResp = { dummy: true };
      mockedCreate.mockImplementation(() => {
        throw new Error('no good');
      });

      await router({
        method: 'POST',
        url: '/',
      }, mockedRes);

      expect(mockedCreate).toBeCalledTimes(1);
      expect(mockedCreate).toBeCalledWith(mockedCreateParams);
      expect(mockedRes.json).toBeCalledTimes(1);
      expect(mockedStatus).toBeCalledTimes(1);
      expect(mockedStatus).toBeCalledWith(400);
    });
  });

  describe('update', () => {
    describe('put', () => {
      it('should return successfully with valid params', async () => {
        mockedUpdateResp = { dummy: true };

        await router({
          method: 'PUT',
          url: '/3',
          body: {
            dummy: 'data',
          },
        }, mockedRes);

        expect(mockedUpdate).toBeCalledTimes(1);
        expect(mockedRes.json).toBeCalledTimes(1);
        expect(mockedRes.json).toBeCalledWith({ rows: mockedUpdateResp });
      });

      it('should return 400 with invalid params 3a', async () => {
        await router({
          method: 'PUT',
          url: '/3a',
          body: {
            dummy: 'data',
          },
        }, mockedRes);

        expect(mockedUpdate).toBeCalledTimes(1);
        expect(mockedRes.sendStatus).toBeCalledWith(400);
      });

      it('should return 400 with invalid params -3', async () => {
        await router({
          method: 'PUT',
          url: '/-3',
          body: {
            dummy: 'data',
          },
        }, mockedRes);

        expect(mockedUpdate).toBeCalledTimes(1);
        expect(mockedRes.sendStatus).toBeCalledWith(400);
      });

      it('should return 400 when error updating', async () => {
        mockedUpdate.mockImplementation(() => {
          throw new Error('no good');
        });
        await router({
          method: 'PUT',
          url: '/3',
          body: {},
        }, mockedRes);

        expect(mockedUpdate).toBeCalledTimes(1);
        expect(mockedStatus).toBeCalledTimes(1);
        expect(mockedStatus).toBeCalledWith(400);
      });
    });
  });

  describe('delete', () => {
    it('should return successfully with valid params', async () => {
      await router({
        method: 'DELETE',
        url: '/3',
      }, mockedRes);

      expect(mockedDestroy).toBeCalledTimes(1);
      expect(mockedRes.json).toBeCalledTimes(1);
      expect(mockedRes.json).toBeCalledWith({ rows: mockedDestroyResp });
    });

    it('should return 400 with invalid params 3a', async () => {
      await router({
        method: 'DELETE',
        url: '/3a',
      }, mockedRes);

      expect(mockedDestroy).toBeCalledTimes(1);
      expect(mockedRes.sendStatus).toBeCalledWith(400);
    });

    it('should return 400 with invalid params -3', async () => {
      await router({
        method: 'DELETE',
        url: '/-3',
      }, mockedRes);

      expect(mockedDestroy).toBeCalledTimes(1);
      expect(mockedRes.sendStatus).toBeCalledWith(400);
    });

    it('should return 400 when error updating', async () => {
      mockedDestroy.mockImplementation(() => {
        throw new Error('no good');
      });
      await router({
        method: 'DELETE',
        url: '/3',
      }, mockedRes);

      expect(mockedDestroy).toBeCalledTimes(1);
      expect(mockedStatus).toBeCalledTimes(1);
      expect(mockedStatus).toBeCalledWith(400);
    });
  });
});
