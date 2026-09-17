import express, { NextFunction, Request, Response } from 'express';
import { messageStore } from './store';
import { validateCreateMessageInput } from './validators';

const app = express();
app.use(express.json());

app.post('/message', (req: Request, res: Response) => {
  const result = validateCreateMessageInput(req.body);
  if (!result.valid) {
    return res.status(400).json({ error: result.error });
  }

  const message = messageStore.create(result.data);
  return res.status(201).json(message);
});

app.get('/message/:id', (req: Request, res: Response) => {
  const message = messageStore.findById(req.params.id);
  if (!message) {
    return res.status(404).json({ error: 'Message not found.' });
  }

  return res.status(200).json(message);
});

app.delete('/message/:id', (req: Request, res: Response) => {
  const deleted = messageStore.delete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Message not found.' });
  }

  return res.status(204).send();
});

// Unknown routes.
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ error: 'Malformed JSON body.' });
  }

  console.error(err);
  return res.status(500).json({ error: 'Internal server error.' });
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
