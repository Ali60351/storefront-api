import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { requireAuth } from './validators';
import UserOrderStore from '../models/user_order';
import { UserOrder, AuthToken } from '../types';

const app = express.Router();
const store = new UserOrderStore();

const secret = process.env.JWT_SECRET as string;

app.post('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userOrder: UserOrder = req.body;
    const authHeader = req.headers.authorization as string;

    const [_, token] = authHeader.split(' ');
    const verifiedToken = jwt.verify(token, secret) as AuthToken;

    if (verifiedToken.user.id !== userOrder.user_id) {
      res.status(403);
      res.json({ "error": "Cannot modify other user's cart!" });
      return;
    }

    const results = await store.create(userOrder);

    res.status(201);
    res.json(results);
  } catch (err) {
    res.status(400);
    res.json({"error": "Unable to add to cart"})
  }
});

export default app;