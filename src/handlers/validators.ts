import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express"
import { isAuthToken } from '../types';

const secret = process.env.JWT_SECRET as string;

export type MiddlewareFunction = (request: Request, response: Response, next: NextFunction) => void;

export const validateUser: MiddlewareFunction = (req, res, next) => {
  const requiredFields = ['firstName', 'lastName', 'password'];
  if (requiredFields.some(field => !req.body[field])) {
    res.status(400);
    res.json({ requiredFields: requiredFields });
  } else {
    next();
  }
};

export const requireAuth: MiddlewareFunction = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(403);
    res.json({ "error": "Authorization is required" });
    return;
  };

  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer') {
    res.status(403);
    res.json({ "error": "Unsupported authorization token" });
    return;
  };

  try {
    const decodedToken = jwt.verify(token, secret);

    if (typeof decodedToken === 'string') {
      throw Error("Unsupported authorization token");
    }

    if (!isAuthToken(decodedToken)) {
      throw Error("Unsupported authorization token");
    }

  } catch (err) {
    res.status(403);
    res.json({ "error": "Unsupported authorization token" });
    return;
  }

  next();
};