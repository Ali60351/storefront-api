import { Product, StoreUser, ProductOrder } from '../types';

import ProductStore from './product';
import UserStore from './store_user';
import ProductOrderStore from './product_order';

const userStore = new UserStore();
const productStore = new ProductStore();
const productOrderStore = new ProductOrderStore();

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
  })

  it('Expects index to return [] on empty database', async () => {
    const result = await productOrderStore.index();
    expect(result).toEqual([]);
  })

  it('Expects create to return sent values', async () => {
    const result = await productOrderStore.create(productOrder);

    productOrderId = result.id;

    expect(result.product_id).toBe(productOrder.product_id);
    expect(result.quantity).toBe(productOrder.quantity);
    expect(result.user_id).toBe(productOrder.user_id);
    expect(result.status).toBe(productOrder.status);
  })

  it('Expects show with productOrderId to contain our product order', async () => {
    const result = await productOrderStore.show(String(productOrderId));

    expect(result.product_id).toBe(productOrder.product_id);
    expect(result.quantity).toBe(productOrder.quantity);
    expect(result.status).toBe(productOrder.status);
    expect(result.user_id).toBe(productOrder.user_id);
  });

  it('Expects delete with id 1 to contain our product', async () => {
    const result = await productOrderStore.delete(String(productOrderId));

    expect(result.product_id).toBe(productOrder.product_id);
    expect(result.quantity).toBe(productOrder.quantity);
    expect(result.status).toBe(productOrder.status);
    expect(result.user_id).toBe(productOrder.user_id);
  });

  it('Expects index to return [] after deletion', async () => {
    const result = await productOrderStore.index();
    expect(result).toEqual([]);
  })

  afterAll(async () => {
    await productStore.delete(String(productId));
    await userStore.delete(String(userId));
  })
});