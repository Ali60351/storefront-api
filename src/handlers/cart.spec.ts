import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../server';

import ProductStore from '../models/product';
import UserOrderStore from '../models/user_order';
import ProductOrderStore from '../models/product_order';

import { AuthToken, Product, StoreUser, UserOrder, ProductOrder, CartEntry } from '../types';

const secret = process.env.JWT_SECRET as string;

const productStore = new ProductStore();
const userOrderStore = new UserOrderStore();
const productOrderStore = new ProductOrderStore();

const user: StoreUser = {
  'first_name': 'Yam',
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

describe('Test API endpoints for Cart', () => {
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

    const createdProductOrder = await productOrderStore.create(productOrder);
    productOrderId = createdProductOrder.id;
  })

  it('expects 200 and our product order in cart', async () => {
    const response = await request(app).get('/api/cart/').set('Authorization', `Bearer ${token}`);
    const fetchedCart: CartEntry[] = response.body;

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveSize(1);

    const userCart = fetchedCart[0];

    expect(userCart.user_id).toBe(userId);
    expect(userCart.product_id).toBe(productId);
    expect(userCart.quantity).toBe(productOrder.quantity);
    expect(userCart.status).toBe(userOrder.status);
  });

  afterAll(async () => {
    await productOrderStore.delete(String(productOrderId));
    await userOrderStore.delete(String(userOrderId));
    await request(app).delete(`/api/user/${userId}`).set('Authorization', `Bearer ${token}`);
    await productStore.delete(String(productId));
  })
});