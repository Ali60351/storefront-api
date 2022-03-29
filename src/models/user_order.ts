import Model from './model';
import { UserOrder } from '../types';

export default class UserOrderStore extends Model {
  index = async (): Promise<UserOrder[]> => await this.execute(
    'SELECT * FROM user_order',
    'rows'
  );

  show = async (id: string): Promise<UserOrder> => await this.execute(
    'SELECT * FROM user_order WHERE id=($1)',
    'rows.0',
    [id]
  );

  create = async (productOrder: UserOrder): Promise<Required<UserOrder>> => {
    return await this.execute(
      'INSERT INTO user_order (user_id, status) VALUES($1, $2) RETURNING *',
      'rows.0',
      [productOrder.user_id, productOrder.status]
    );
  }

  delete = async (id: string): Promise<UserOrder> => await this.execute(
    'DELETE FROM user_order WHERE id=($1) RETURNING *',
    'rows.0',
    [id]
  );
}