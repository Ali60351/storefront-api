import express from 'express';

import { requireAuth } from './validators';
import ProductStore from '../models/product';
import { Product } from '../types';

const app = express.Router();
const store = new ProductStore();

app.get('/', async (req, res) => {
  const results = await store.index();
  res.json(results);
});

app.get('/:id', async (req, res) => {
  const { id } = req.params;

  const results = await store.show(id);
  res.json(results);
});

app.post('/', requireAuth, async (req, res) => {
  const product: Product = req.body;

  const results = await store.create(product);
  return results;
});

export default app;