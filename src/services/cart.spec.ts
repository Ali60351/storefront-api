import { Product, StoreUser, ProductOrder, UserOrder } from '../types';

import ProductStore from '../models/product';
import UserStore from '../models/store_user';
import ProductOrderStore from '../models/product_order';
import UserOrderStore from '../models/user_order';
import CartService from './cart';

const userStore = new UserStore();
const productStore = new ProductStore();
const productOrderStore = new ProductOrderStore();
const userOrderStore = new UserOrderStore();
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
  order_id: 1,
  product_id: 1,
  quantity: 1,
}

const userOrder: UserOrder = {
  'user_id': 1,
  'status': 'active'
};

describe('Test the cart service', () => {
  let userId: number;
  let productId: number;
  let productOrderId: number;
  let userOrderId: number;

  beforeAll(async () => {
    userId = (await userStore.create(user))['id'];
    productId = (await productStore.create(product))['id'];

    userOrder.user_id = userId;
    userOrderId = (await userOrderStore.create(userOrder))['id'];

    productOrder.order_id = userOrderId;
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
    expect(result[0].user_id).toBe(userOrder.user_id);
    expect(result[0].status).toBe(userOrder.status);
  })

  afterAll(async () => {
    await productOrderStore.delete(String(productOrderId));
    await userOrderStore.delete(String(userOrderId));
    await productStore.delete(String(productId));
    await userStore.delete(String(userId));
  })
});