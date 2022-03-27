import { Product } from '../types';
import ProductStore from './product';

const productStore = new ProductStore();

const product: Product = {
  'name': 'football',
  'price': 150
};

describe('Test the product model', () => {
  let productId: number;

  it('Expects index to return [] on empty database', async () => {
    const result = await productStore.index();
    expect(result).toEqual([]);
  })

  it('Expects create to return sent values', async () => {
    const result = await productStore.create(product);

    productId = result.id;

    expect(result.name).toBe(product.name);
    expect(result.price).toBe(product.price);
  })

  it('Expects show with productId to contain our product', async () => {
    const result = await productStore.show(String(productId));
    expect(result.name).toBe(product.name);
    expect(result.price).toBe(product.price);
  });

  it('Expects delete with productId to contain our product', async () => {
    const result = await productStore.delete(String(productId));
    expect(result.name).toBe(product.name);
    expect(result.price).toBe(product.price);
  });

  it('Expects index to return [] after deletion', async () => {
    const result = await productStore.index();
    expect(result).toEqual([]);
  })
});