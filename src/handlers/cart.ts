import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { requireAuth } from './validators';
import CartService from '../services/cart';
import { AuthToken } from '../types';

const app = express.Router();
const cartService = new CartService();

const secret = process.env.JWT_SECRET as string;

app.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization as string;
    const [_, token] = authHeader.split(' ');
    const verifiedToken = jwt.verify(token, secret) as AuthToken;

    const results = await cartService.getOrdersForUser(String(verifiedToken.user.id));
    res.json(results);
  } catch (err) {
    res.status(500);
    res.json({ "error": "Unable to fetch user cart." });
  }
});

export default app;