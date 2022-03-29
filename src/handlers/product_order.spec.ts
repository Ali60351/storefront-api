import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../server';

import ProductStore from '../models/product';
import ProductOrderStore from '../models/product_order';
import UserOrderStore from '../models/user_order';

import { AuthToken, Product, ProductOrder, StoreUser, UserOrder } from '../types';

const secret = process.env.JWT_SECRET as string;

const productStore = new ProductStore();
const productOrderStore = new ProductOrderStore();
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

const productOrder: ProductOrder = {
  'order_id': 1,
  'product_id': 1,
  'quantity': 1,
}

describe('Test API endpoints for Product Order', () => {
  let token: string;
  let productId: number;
  let userId: number;
  let userOrderId: number;
  let productOrderId: number;

  beforeAll(async () => {
    const response = await request(app).post('/api/user/').send(user);
    token = response.body;

    const authToken = jwt.verify(token, secret) as AuthToken;
    const createdProduct = await productStore.create(product);

    userId = authToken.user.id;
    productId = createdProduct.id;

    userOrder.user_id = userId;

    const createdUserOrder = await userOrderStore.create(userOrder);
    userOrderId = createdUserOrder.id;

    productOrder.product_id = productId;
    productOrder.order_id = userOrderId;
  })

  it('expects 201 and our product order on create', async () => {
    const response = await request(app).post('/api/product-order/')
      .set('Authorization', `Bearer ${token}`)
      .send(productOrder);

    const createdProductOrder: Required<ProductOrder> = response.body;

    productOrderId = createdProductOrder.id;

    expect(response.statusCode).toBe(201);
    expect(createdProductOrder.product_id).toBe(productId);
    expect(createdProductOrder.quantity).toBe(productOrder.quantity);
  });

  afterAll(async () => {
    await productOrderStore.delete(String(productOrderId));
    await userOrderStore.delete(String(userOrderId));
    await request(app).delete(`/api/user/${userId}`).set('Authorization', `Bearer ${token}`);
    await productStore.delete(String(productId));
  })
});