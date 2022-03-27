import { Router } from "express";
import jwt from 'jsonwebtoken';

import UserStore from '../models/store_user';
import { StoreUser } from "../types";
import { requireAuth, validateUser } from "./validators";

const app = Router();
const store = new UserStore();

const secret = process.env.JWT_SECRET as string;

app.get('/', requireAuth, async (req, res) => {
  const results = await store.index();
  res.json(results);
});

app.get('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;

  const results = await store.show(id);
  res.json(results);
});

app.post('/', validateUser, async (req, res) => {
  try {
    const { first_name, last_name, password } = req.body;
    const user: StoreUser = await store.create({ first_name, last_name, password });

    const token = jwt.sign({ user, type: 'USER_AUTH' }, secret);

    res.status(201);
    res.json(token);
  } catch (err) {
    res.status(400)
    res.json(err)
  }
});

app.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;

  const results = await store.delete(id);
  res.json(results);
});

app.post('/auth', validateUser, async (req, res) => {
  const { first_name, last_name, password } = req.body;
  const result = await store.authenticate({ first_name, last_name, password });

  if (typeof result === 'string') {
    res.json(result);
  } else {
    const token = jwt.sign({ user: result, type: 'USER_AUTH' }, secret);
    res.json(token);
  }
})

export default app;
