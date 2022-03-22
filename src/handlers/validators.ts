import { Request, Response, NextFunction } from "express"

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