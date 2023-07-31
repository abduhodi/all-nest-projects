import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('users (e2e)', () => {
  let app: INestApplication;
  let token: String;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'ahmadchik',
        password: '@hmaCh1k',
      });
    token = response.body.accessToken;
  });
  it('/users (GET) --> 200 OK', () => {
    return request(app.getHttpServer())
      .get('/users/all')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('/users/all (GET) --> 401 "Unauthorized"', () => {
    return request(app.getHttpServer())
      .get('/users/all')
      .expect(401)
      .expect('Content-Type', /json/);
  });

  it('/auth/signup (POST) --> 201 "Created"', async () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'Ahmadjon',
        username: 'ahmadchik1234567811',
        password: '@hmaCh1k',
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toMatchObject({
          accessToken: expect.any(String),
        });
      });
  });

  it('/auth/signup (POST) --> 400 "Bad Request"', async () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'Ahmadjon',
        username: 'ahmadchik1234567811',
        password: '@hmaCh1k',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toMatchObject({
          statusCode: 400,
          message: 'User already exists',
        });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
