import Model from './model';
import { ProductOrder } from '../types';

export default class ProductOrderStore extends Model {
  index = async (): Promise<ProductOrder[]> => {
    try {
      return await this.execute(
        'SELECT * FROM product_order',
        'rows'
      );
    }
    catch (err) {
      throw Error('Failed index for product order');
    }
  };

  show = async (id: string): Promise<ProductOrder> => {
    try {
      return await this.execute(
        'SELECT * FROM product_order WHERE id=($1)',
        'rows.0',
        [id]
      );
    }
    catch (err) {
      throw Error('Failed show for product order');
    }
  }

  create = async (productOrder: ProductOrder): Promise<Required<ProductOrder>> => {
    try {
      return await this.execute(
        'INSERT INTO product_order (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *',
        'rows.0',
        [productOrder.order_id, productOrder.product_id, productOrder.quantity]
      );
    }
    catch (err) {
      throw Error('Failed create for product order');
    }
  };

  delete = async (id: string): Promise<ProductOrder> => {
    try {
      return await this.execute(
        'DELETE FROM product_order WHERE id=($1) RETURNING *',
        'rows.0',
        [id]
      );
    }
    catch (err) {
      throw Error('Failed delete for product order');
    }
  };
}