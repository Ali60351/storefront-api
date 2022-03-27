import { Product, StoreUser, ProductOrder } from '../types';

import ProductStore from '../models/product';
import UserStore from '../models/store_user';
import ProductOrderStore from '../models/product_order';
import CartService from './cart';

const userStore = new UserStore();
const productStore = new ProductStore();
const productOrderStore = new ProductOrderStore();
const cartService = new CartService();

const product: Product = {
  'name': 'football',
  'price': 150
};

const user: StoreUser = {
  first_name: 'John',
  last_name: 'Doe',
  password: '12345678'
};

const productOrder: ProductOrder = {
  product_id: 1,
  quantity: 1,
  user_id: 1,
  status: 'active'
}

describe('Test the product order model', () => {
  let userId: number;
  let productId: number;
  let productOrderId: number;

  beforeAll(async () => {
    userId = (await productStore.create(product))['id'];
    productId = (await userStore.create(user))['id'];

    productOrder.user_id = userId;
    productOrder.product_id = productId;

    productOrderId = (await productOrderStore.create(productOrder))['id'];
  })

  it('Expects getOrdersForUser to return created product order', async () => {
    const result = await cartService.getOrdersForUser(String(userId));

    if (!result.length) {
      throw Error('Unexpected result');
    }

    expect(result[0].product_id).toBe(productOrder.product_id);
    expect(result[0].quantity).toBe(productOrder.quantity);
    expect(result[0].user_id).toBe(productOrder.user_id);
    expect(result[0].status).toBe(productOrder.status);
  })

  afterAll(async () => {
    await productOrderStore.delete(String(productOrderId));
    await productStore.delete(String(productId));
    await userStore.delete(String(userId));
  })
});