import { RequestHandler } from 'express';

import { Todo } from '../models/todos';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (request, response, next) => {
  const text = (<{ text: string }>request.body).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  console.log(request);
  response.status(201).json({ message: 'Created !', createdTodo: newTodo });
};
