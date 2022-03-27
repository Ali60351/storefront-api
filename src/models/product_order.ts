import Model from './model';
import { ProductOrder } from '../types';

export default class UserStore extends Model {
  index = async (): Promise<ProductOrder[]> => await this.execute(
    'SELECT * FROM product_order',
    'rows'
  );

  show = async (id: string): Promise<ProductOrder> => await this.execute(
    'SELECT * FROM product_order WHERE id=($1)',
    'rows.0',
    [id]
  );

  create = async (productOrder: ProductOrder): Promise<Required<ProductOrder>> => {
    return await this.execute(
      'INSERT INTO product_order (product_id, quantity, status, user_id) VALUES($1, $2, $3, $4) RETURNING *',
      'rows.0',
      [productOrder.product_id, productOrder.quantity, productOrder.status, productOrder.user_id]
    );
  }

  delete = async (id: string): Promise<ProductOrder> => await this.execute(
    'DELETE FROM product_order WHERE id=($1) RETURNING *',
    'rows.0',
    [id]
  );
}