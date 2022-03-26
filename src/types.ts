import { JwtPayload } from "jsonwebtoken";

export interface StoreUser {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
}

export interface Product {
  id?: number;
  name: string;
  price: number;
  category?: string;
}

export interface ProductOrder {
  id?: number;
  product_id: number;
  quantity: number;
  user_id: number;
  status: 'active' | 'complete'
}

export interface Token extends JwtPayload {
  type?: 'USER_AUTH'
}

export interface AuthToken extends Token {
  user: StoreUser,
  type: 'USER_AUTH'
}

export const isAuthToken = (token: Token): token is AuthToken => token.type === 'USER_AUTH';