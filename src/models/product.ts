import Model from './model';
import { Product } from '../types';

export default class ProductStore extends Model {
  index = async (): Promise<Product[]> => await this.execute(
    'SELECT * FROM product',
    'rows'
  );

  show = async (id: string): Promise<Product> => await this.execute(
    'SELECT * FROM product WHERE id=($1)',
    'rows.0',
    [id]
  );

  create = async (product: Product): Promise<Required<Product>> => {
    if (product.category) {
      return await this.execute(
        'INSERT INTO product (name, price, category) VALUES($1, $2, $3) RETURNING *',
        'rows.0',
        [product.name, product.price, product.category]
      );
    }

    return await this.execute(
      'INSERT INTO product (name, price) VALUES($1, $2) RETURNING *',
      'rows.0',
      [product.name, product.price]
    );
  }

  delete = async (id: string): Promise<Product> => await this.execute(
    'DELETE FROM product WHERE id=($1) RETURNING *',
    'rows.0',
    [id]
  );
}