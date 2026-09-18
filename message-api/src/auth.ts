import { NextFunction, Request, Response } from 'express';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {

  console.warn('API_KEY is not configured. All requests will be rejected.');
}

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const key = req.header('x-api-key');
  if (!key || key !== API_KEY) {
    res.status(401).json({ error: 'Missing or invalid API key.' });
    return;
  }

  next();
}
