import express, { Request, Response } from 'express';

import { requireAuth, validateProduct } from './validators';
import ProductStore from '../models/product';
import { Product } from '../types';

const app = express.Router();
const store = new ProductStore();

app.get('/', async (req: Request, res: Response) => {
  try {
    const results = await store.index();
    res.json(results);
  } catch (err) {
    res.status(500);
    res.json({ "error": "Unable to fetch products." });
  }
});

app.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const results = await store.show(id);

    res.json(results);
  } catch (err) {
    res.status(500);
    res.json({ "error": "Unable to fetch product." });
  }
});

app.post('/', requireAuth, validateProduct, async (req: Request, res: Response) => {
  try {
    const product: Product = req.body;
    const results = await store.create(product);

    res.status(201);
    res.json(results);
  } catch (err) {
    res.status(500);
    res.json({ "error": "Unable to add product." });
  }
});

export default app;