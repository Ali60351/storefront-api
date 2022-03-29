import { Product, StoreUser, ProductOrder, UserOrder } from '../types';

import ProductStore from './product';
import UserStore from './store_user';
import UserOrderStore from './user_order';

const userStore = new UserStore();
const productStore = new ProductStore();
const userOrderStore = new UserOrderStore();

const product: Product = {
  'name': 'football',
  'price': 150
};

const user: StoreUser = {
  first_name: 'John',
  last_name: 'Doe',
  password: '12345678'
};

const userOrder: UserOrder = {
  'user_id': 1,
  'status': 'active'
};

describe('Test the product order model', () => {
  let userId: number;
  let productId: number;
  let userOrderId: number;

  beforeAll(async () => {
    userId = (await userStore.create(user))['id'];
    productId = (await productStore.create(product))['id'];

    userOrder.user_id = userId;
  })

  it('Expects index to return [] on empty database', async () => {
    const result = await userOrderStore.index();
    expect(result).toEqual([]);
  })

  it('Expects create to return sent values', async () => {
    const result = await userOrderStore.create(userOrder);

    userOrderId = result.id;

    expect(result.user_id).toBe(userOrder.user_id);
    expect(result.status).toBe(userOrder.status);
  })

  it('Expects show with productOrderId to contain our product order', async () => {
    const result = await userOrderStore.show(String(userOrderId));

    expect(result.user_id).toBe(userOrder.user_id);
    expect(result.status).toBe(userOrder.status);
  });

  it('Expects delete with id 1 to contain our product', async () => {
    const result = await userOrderStore.delete(String(userOrderId));

    expect(result.user_id).toBe(userOrder.user_id);
    expect(result.status).toBe(userOrder.status);
  });

  it('Expects index to return [] after deletion', async () => {
    const result = await userOrderStore.index();
    expect(result).toEqual([]);
  })

  afterAll(async () => {
    await productStore.delete(String(productId));
    await userStore.delete(String(userId));
  })
});