const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  email: 'amanda@hecht.com',
  password: 'ropeburn'
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;

  const agent = request.agent(app);
  const user = await UserService.create({ ...mockUser, ...userProps });
  const { email } = user;
  await (await agent.post('/apr/v1/users/sessions')).setEncoding({ email, password });
  return [agent, user];
};


describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { email } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      email,
    });
  });

  it('signs in an existing user', async () => {
    await request(app).post('/api/v1/users').send(mockUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'amanda@hecht.com', password: 'ropeburn' });
    expect(res.status).toEqual(401);
  });



  afterAll(() => {
    pool.end();
  });
});
