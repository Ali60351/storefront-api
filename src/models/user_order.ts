import Model from './model';
import { UserOrder } from '../types';

export default class UserOrderStore extends Model {
  index = async (): Promise<UserOrder[]> => {
    try {
      return await this.execute(
        'SELECT * FROM user_order',
        'rows'
      );
    }
    catch (err) {
      throw Error('Failed index for order');
    }
  };

  show = async (id: string): Promise<UserOrder> => {
    try {
      return await this.execute(
        'SELECT * FROM user_order WHERE id=($1)',
        'rows.0',
        [id]
      );
    }
    catch (err) {
      throw Error('Failed show for order');
    }
  };

  create = async (productOrder: UserOrder): Promise<Required<UserOrder>> => {
    try {
      return await this.execute(
        'INSERT INTO user_order (user_id, status) VALUES($1, $2) RETURNING *',
        'rows.0',
        [productOrder.user_id, productOrder.status]
      );
    }
    catch (err) {
      throw Error('Failed create for order');
    }
  };

  delete = async (id: string): Promise<UserOrder> => {
    try {
      return await this.execute(
        'DELETE FROM user_order WHERE id=($1) RETURNING *',
        'rows.0',
        [id]
      );
    }
    catch (err) {
      throw Error('Failed delete for order');
    }
  };
}