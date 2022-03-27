import ProductStore from './product';

const productStore = new ProductStore();

describe('Test the product model', () => {
  it('Expects index to return [] before anything is added', async () => {
    const result = await productStore.index();
    expect(result).toEqual([]);
  })
});