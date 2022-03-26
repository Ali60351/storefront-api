import Model from './model';
import bcrypt from 'bcrypt';
import { Product } from '../types';

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = Number(process.env.SALT_ROUNDS)

export default class UserStore extends Model {
  index = async (): Promise<Product[]> => await this.execute(
    'SELECT * FROM product',
    'rows'
  );

  show = async (id: string): Promise<Product> => await this.execute(
    'SELECT * FROM product WHERE id=($1)',
    'rows',
    [id]
  );

  create = async (product: Product): Promise<Product> => {
    if (product.category) {
      return await this.execute(
        'INSERT INTO product (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *',
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
    'DELETE FROM product WHERE id=($1)',
    'rows',
    [id]
  );
}