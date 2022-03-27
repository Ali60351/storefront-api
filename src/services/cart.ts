import Model from "../models/model";
import { ProductOrder } from "../types";

export default class CartService extends Model {
  getOrdersForUser = async (id: string): Promise<ProductOrder[]> => await this.execute(
    'SELECT * FROM product_order WHERE user_id=($1)',
    'rows',
    [id]
  )
}