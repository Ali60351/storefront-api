import Model from "../models/model";

export default class CartService extends Model {
  getOrdersForUser = async (id: string) => await this.execute(
    'SELECT * FROM product_order WHERE user_id=($1)',
    'rows',
    [id]
  )
}