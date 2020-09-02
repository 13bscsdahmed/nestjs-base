import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export function requestMiddleware(req: Request, res: Response, next: any) {
  req.reqId = uuidv4();
  next();
};
