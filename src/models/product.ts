import Model from './model';
import { Product } from '../types';

export default class ProductStore extends Model {
  index = async (): Promise<Product[]> => {
    try {
      return await this.execute(
        'SELECT * FROM product',
        'rows'
      );
    }
    catch (err) {
      throw Error('Failed index for product');
    }
  };

  show = async (id: string): Promise<Product> => {
    try {
      return await this.execute(
        'SELECT * FROM product WHERE id=($1)',
        'rows.0',
        [id]
      );
    }
    catch (err) {
      throw Error('Failed show for product');
    }
  };

  create = async (product: Product): Promise<Required<Product>> => {
    try {
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
    } catch (err) {
      throw Error('Failed create for product');
    }
  }

  delete = async (id: string): Promise<Product> => {
    try {
      return await this.execute(
        'DELETE FROM product WHERE id=($1) RETURNING *',
        'rows.0',
        [id]
      );
    }
    catch (err) {
      throw Error('Failed delete for product');
    }
  };
}