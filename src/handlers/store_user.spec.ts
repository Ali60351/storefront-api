import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../server';
import UserStore from '../models/store_user';

import { AuthToken, StoreUser } from '../types';

const secret = process.env.JWT_SECRET as string;
const userStore = new UserStore();

const user: StoreUser = {
  'first_name': 'Sam',
  'last_name': 'Jones',
  'password': '12345'
};

describe('Test API endpoints for User', () => {
  let userId: number;
  let token: string;

  it('expects 201 on post', async () => {
    const response = await request(app).post('/api/user/').send(user);

    token = response.body;

    expect(response.statusCode).toBe(201);
    expect(() => jwt.verify(response.body, secret)).not.toThrow();

    const authToken = jwt.verify(response.body, secret) as AuthToken;

    expect(authToken.user.first_name).toBe(user.first_name);
    expect(authToken.user.last_name).toBe(user.last_name);

    userId = authToken.user.id;
  });

  it('expects index to return our user in a list', async () => {
    const response = await request(app).get('/api/user/').set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveSize(1);

    const fetchedUser = response.body[0] as StoreUser;

    expect(fetchedUser.first_name).toBe(user.first_name);
    expect(fetchedUser.last_name).toBe(user.last_name);
  })

  it('expects show to return our user', async () => {
    const response = await request(app).get(`/api/user/${userId}`).set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    const fetchedUser = response.body as StoreUser;

    expect(fetchedUser.first_name).toBe(user.first_name);
    expect(fetchedUser.last_name).toBe(user.last_name);
  });

  it('expect auth to return AuthToken', async () => {
    const response = await request(app).post(`/api/user/auth`).send(user);
    expect(response.statusCode).toBe(200);

    const authToken = jwt.verify(response.body, secret) as AuthToken;

    expect(authToken.user.first_name).toBe(user.first_name);
    expect(authToken.user.last_name).toBe(user.last_name);
  });

  it('expects delete to return our user', async () => {
    const response = await request(app).delete(`/api/user/${userId}`).set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    const fetchedUser = response.body as StoreUser;

    expect(fetchedUser.first_name).toBe(user.first_name);
    expect(fetchedUser.last_name).toBe(user.last_name);
  });
});