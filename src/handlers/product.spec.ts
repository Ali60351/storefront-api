import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../server';

import ProductStore from '../models/product';

import { AuthToken, Product, StoreUser } from '../types';

const secret = process.env.JWT_SECRET as string;
const productStore = new ProductStore();

const user: StoreUser = {
  'first_name': 'Ham',
  'last_name': 'Jones',
  'password': '12345'
};

const product: Product = {
  name: 'Pencil',
  price: 5
};

describe('Test API endpoints for Product', () => {
  let token: string;
  let productId: number;

  beforeAll(async () => {
    const response = await request(app).post('/api/user/').send(user);
    token = response.body;
  })

  it('expects 200 and empty list on index', async () => {
    const response = await request(app).get('/api/product/');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('expects 201 and our product on create', async () => {
    const response = await request(app).post('/api/product/').set('Authorization', `Bearer ${token}`).send(product);
    const createdProduct: Required<Product> = response.body;

    productId = createdProduct.id;

    expect(response.statusCode).toBe(201);
    expect(createdProduct.name).toBe(product.name);
    expect(createdProduct.price).toBe(product.price);
  });

  it('expects 200 and our product on show', async () => {
    const response = await request(app).get(`/api/product/${productId}`);
    const fetchedProduct: Product = response.body;

    expect(response.statusCode).toBe(200);
    expect(fetchedProduct.name).toBe(product.name);
    expect(fetchedProduct.price).toBe(product.price);
  });

  afterAll(async () => {
    const authToken = jwt.verify(token, secret) as AuthToken;
    await request(app).delete(`/api/user/${authToken.user.id}`).set('Authorization', `Bearer ${token}`);
    await productStore.delete(String(productId));
  })
});