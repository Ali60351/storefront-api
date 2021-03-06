import { Product, StoreUser, ProductOrder, UserOrder } from '../types';

import ProductStore from './product';
import UserStore from './store_user';
import ProductOrderStore from './product_order';
import UserOrderStore from './user_order';

const userStore = new UserStore();
const productStore = new ProductStore();
const productOrderStore = new ProductOrderStore();
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

const productOrder: ProductOrder = {
  order_id: 1,
  product_id: 1,
  quantity: 1,
}

const userOrder: UserOrder = {
  'user_id': 1,
  'status': 'active'
};

describe('Test the product order model', () => {
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
  })

  it('Expects index to return [] on empty database', async () => {
    const result = await productOrderStore.index();
    expect(result).toEqual([]);
  })

  it('Expects create to return sent values', async () => {
    const result = await productOrderStore.create(productOrder);

    productOrderId = result.id;

    expect(result.product_id).toBe(productOrder.product_id);
    expect(result.order_id).toBe(productOrder.order_id);
    expect(result.quantity).toBe(productOrder.quantity);
  })

  it('Expects show with productOrderId to contain our product order', async () => {
    const result = await productOrderStore.show(String(productOrderId));

    expect(result.product_id).toBe(productOrder.product_id);
    expect(result.order_id).toBe(productOrder.order_id);
    expect(result.quantity).toBe(productOrder.quantity);
  });

  it('Expects delete with id 1 to contain our product', async () => {
    const result = await productOrderStore.delete(String(productOrderId));

    expect(result.product_id).toBe(productOrder.product_id);
    expect(result.order_id).toBe(productOrder.order_id);
    expect(result.quantity).toBe(productOrder.quantity);
  });

  it('Expects index to return [] after deletion', async () => {
    const result = await productOrderStore.index();
    expect(result).toEqual([]);
  })

  afterAll(async () => {
    await userOrderStore.delete(String(userOrderId));
    await productStore.delete(String(productId));
    await userStore.delete(String(userId));
  })
});