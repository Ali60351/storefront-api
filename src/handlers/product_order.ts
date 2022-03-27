import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { requireAuth } from './validators';
import ProductOrderStore from '../models/product_order';
import { ProductOrder, AuthToken } from '../types';

const app = express.Router();
const store = new ProductOrderStore();

const secret = process.env.JWT_SECRET as string;

app.post('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const productOrder: ProductOrder = req.body;
    const authHeader = req.headers.authorization as string;

    const [_, token] = authHeader.split(' ');
    const verifiedToken = jwt.verify(token, secret) as AuthToken;

    if (verifiedToken.user.id !== productOrder.user_id) {
      res.status(403);
      res.json({ "error": "Cannot modify other user's cart!" });
      return;
    }

    const results = await store.create(productOrder);

    res.status(201);
    res.json(results);
  } catch (err) {
    res.status(400);
    res.json({"error": "Unable to add to cart"})
  }
});

export default app;