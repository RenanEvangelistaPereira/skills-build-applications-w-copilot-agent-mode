import request from 'supertest';
import { createApp } from '../src/app';
import Activity from '../src/models/Activity';
import User from '../src/models/User';

jest.mock('../src/models/User', () => ({
  __esModule: true,
  default: { find: jest.fn() }
}));

jest.mock('../src/models/Activity', () => ({
  __esModule: true,
  default: { find: jest.fn() }
}));

describe('Octofit backend API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns localhost baseUrl in /api/health', async () => {
    const app = createApp('http://localhost:8000');

    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.port).toBe(8000);
    expect(response.body.baseUrl).toBe('http://localhost:8000');
  });

  it('returns Codespaces baseUrl in /api/health', async () => {
    const app = createApp('https://demo-space-8000.app.github.dev');

    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.baseUrl).toBe('https://demo-space-8000.app.github.dev');
  });

  it('returns users from /api/users', async () => {
    const app = createApp('http://localhost:8000');
    const sortMock = jest.fn().mockResolvedValue([
      {
        username: 'alex-runner',
        displayName: 'Alex Rivera'
      }
    ]);

    (User.find as unknown as jest.Mock).mockReturnValue({
      sort: sortMock
    });

    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body.collection).toBe('users');
    expect(response.body.data).toHaveLength(1);
    expect(User.find).toHaveBeenCalledTimes(1);
  });

  it('returns activities from /api/activities', async () => {
    const app = createApp('http://localhost:8000');
    const sortMock = jest.fn().mockResolvedValue([
      {
        userName: 'Maya Chen',
        activityType: 'Strength circuit'
      }
    ]);

    (Activity.find as unknown as jest.Mock).mockReturnValue({
      sort: sortMock
    });

    const response = await request(app).get('/api/activities');

    expect(response.status).toBe(200);
    expect(response.body.collection).toBe('activities');
    expect(response.body.data).toHaveLength(1);
    expect(Activity.find).toHaveBeenCalledTimes(1);
  });
});
