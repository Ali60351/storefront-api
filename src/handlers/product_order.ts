import express, { Request, Response } from 'express';

import { requireAuth } from './validators';
import ProductOrderStore from '../models/product_order';
import { ProductOrder, AuthToken } from '../types';

const app = express.Router();
const store = new ProductOrderStore();

app.post('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const productOrder: ProductOrder = req.body;
    const results = await store.create(productOrder);

    res.status(201);
    res.json(results);
  } catch (err) {
    res.status(400);
    res.json({"error": "Unable to add to cart"})
  }
});

export default app;