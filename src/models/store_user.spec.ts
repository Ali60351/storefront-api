import { StoreUser } from '../types';
import UserStore from './store_user';

const userStore = new UserStore();

const user: StoreUser = {
  first_name: 'John',
  last_name: 'Doe',
  password: '12345678'
};

describe('Test the user model', () => {
  it('Expects index to return [] on empty database', async () => {
    const result = await userStore.index();
    expect(result).toEqual([]);
  })

  it('Expects create to return sent values', async () => {
    const result = await userStore.create(user);
    expect(result.first_name).toBe(user.first_name);
    expect(result.last_name).toBe(user.last_name);
  })

  // it('Expects show with id 1 to contain our product', async () => {
  //   const result = await productStore.show('1');
  //   expect(result.name).toBe(product.name);
  //   expect(result.price).toBe(product.price);
  // });

  // it('Expects delete with id 1 to contain our product', async () => {
  //   const result = await productStore.delete('1');
  //   expect(result.name).toBe(product.name);
  //   expect(result.price).toBe(product.price);
  // });

  // it('Expects index to return [] after deletion', async () => {
  //   const result = await productStore.index();
  //   expect(result).toEqual([]);
  // })
});