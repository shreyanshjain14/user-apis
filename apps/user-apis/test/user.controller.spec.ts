import { INestApplication } from '@nestjs/common';
import { createTestApp, testRequest } from './app.e2e-spec';


jest.mock('../src/services/user', () => ({
  UserApiService: jest.fn().mockImplementation(() => ({
    getUploadUrls: jest.fn().mockResolvedValue([{key:'signedUrl1', url:'signedUrl2', signedUrl:"signedUrl2"}]),
  })),
}));

describe('UserController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return health check status', async () => {
    const res = await testRequest(app).get('/users/health');
    expect(res.status).toBe(200);
    expect(res["_body"]["data"]).toEqual(
       {
          "message": "auth apis service is working fine"
      }
  );
  });

  it('should return signed URLs for upload', async () => {
    const res = await testRequest(app).post('/users/upload-url').send({
      n:"1",
      path:"documents"
    });
    expect(res.status).toBe(200);
    expect(res["_body"]["data"]).toEqual(
       expect.arrayContaining([
        expect.objectContaining({
          key: expect.any(String),
          url: expect.any(String),
          signedUrl: expect.any(String),
        }),
      ])
    )
  })
});

