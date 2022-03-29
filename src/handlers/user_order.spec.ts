import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../server';

import ProductStore from '../models/product';
import UserOrderStore from '../models/user_order';

import { AuthToken, Product, ProductOrder, StoreUser, UserOrder } from '../types';

const secret = process.env.JWT_SECRET as string;

const productStore = new ProductStore();
const userOrderStore = new UserOrderStore();

const user: StoreUser = {
  'first_name': 'Zam',
  'last_name': 'Jones',
  'password': '12345'
};

const product: Product = {
  name: 'Pencil',
  price: 5
};

const userOrder: UserOrder = {
  'user_id': 1,
  'status': 'active'
};

describe('Test API endpoints for User Order', () => {
  let token: string;
  let productId: number;
  let userId: number;
  let userOrderId: number;

  beforeAll(async () => {
    const response = await request(app).post('/api/user/').send(user);
    token = response.body;

    const authToken = jwt.verify(token, secret) as AuthToken;
    const createdProduct = await productStore.create(product);

    userId = authToken.user.id;
    productId = createdProduct.id;

    userOrder.user_id = userId;
  })

  it('expects 201 and our user order on create', async () => {
    const response = await request(app).post('/api/user-order/')
      .set('Authorization', `Bearer ${token}`)
      .send(userOrder);

    const createdUserOrder: Required<UserOrder> = response.body;

    userOrderId = createdUserOrder.id;

    expect(response.statusCode).toBe(201);
    expect(createdUserOrder.user_id).toBe(userOrder.user_id);
    expect(createdUserOrder.status).toBe(userOrder.status);
  });

  afterAll(async () => {
    await userOrderStore.delete(String(userOrderId));
    await request(app).delete(`/api/user/${userId}`).set('Authorization', `Bearer ${token}`);
    await productStore.delete(String(productId));
  })
});