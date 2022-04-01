import Model from "../models/model";
import { CartEntry } from "../types";

export default class CartService extends Model {
  getOrdersForUser = async (id: string): Promise<CartEntry[]> => {
    try {
      return await this.execute(
        'SELECT * FROM user_order INNER JOIN product_order ON user_order.id = product_order.order_id WHERE user_order.user_id=($1)',
        'rows',
        [id]
      )
    }
    catch (err) {
      throw Error('Failed to fetch orders for cart');
    }
  };
}