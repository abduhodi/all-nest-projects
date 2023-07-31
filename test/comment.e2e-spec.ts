import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('comment (e2e)', () => {
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
  it('/comment (GET) --> 200 OK', () => {
    return request(app.getHttpServer())
      .get('/comment')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('/comment (GET) --> 401 "Unauthorized"', () => {
    return request(app.getHttpServer())
      .get('/comment')
      .expect(401)
      .expect('Content-Type', /json/);
  });

  it('/comment (POST) --> 201 "Created"', async () => {
    return request(app.getHttpServer())
      .post('/comment')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: 3,
        photoId: 1,
        text: 'comment1',
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toMatchObject({
          id: expect.any(Number),
          userId: 3,
          photoId: 1,
          text: 'comment1',
        });
      });
  });

  it('/comment (DELETE) --> 200 "OK"', async () => {
    return request(app.getHttpServer())
      .delete('/comment/4')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchObject({ message: 'delete success' });
      });
  });

  it('/comment (DELETE) --> 200 "OK"', async () => {
    return request(app.getHttpServer())
      .delete('/comment/4')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchObject({ message: 'delete failure' });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
