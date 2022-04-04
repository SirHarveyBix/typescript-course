import { json } from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';

import todoRoutes from './routes/todos';

const app = express();

app.use(json());

app.use('/todos', todoRoutes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  response.status(500).json({ message: error.message });
});

app.listen(3000);
