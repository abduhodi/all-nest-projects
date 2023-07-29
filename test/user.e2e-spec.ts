import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('user (e2e)', () => {
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
        email: 'adminjon1234@admin.uz',
        password: 'admimamen',
      });
    token = response.body.token;
    console.log(token);
  });
  it('/users (GET) --> 200 OK', () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('/users (GET) --> 401 "Unauthorized"', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(401)
      .expect('Content-Type', /json/);
  });

  // it('/auth/registration (POST) --> 201 "Created"', async () => {
  //   return request(app.getHttpServer())
  //     .post('/auth/registration')
  //     .send({
  //       name: 'adminjon1',
  //       email: 'adminjon1234567@admin.uz',
  //       password: 'Adm1m@men123',
  //     })
  //     .expect(201)
  //     .expect('Content-Type', /json/)
  //     .then((response) => {
  //       expect(response.body).toMatchObject({
  //         token: expect.any(String),
  //       });
  //     });
  // });

  it('/auth/registration (POST) --> 400 "Bad Request"', async () => {
    return request(app.getHttpServer())
      .post('/auth/registration')
      .send({
        name: 'adminjon1',
        email: 'adminjon1234567@admin.uz',
        password: 'Adm1m@men123',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toMatchObject({
          statusCode: 400,
          message: 'User is already exist',
        });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
