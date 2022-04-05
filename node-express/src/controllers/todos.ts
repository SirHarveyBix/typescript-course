import { RequestHandler } from 'express';

import { Todo } from '../models/todos';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (request, response, next) => {
  const text = (<{ text: string }>request.body).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  response.status(201).json({ message: 'Created !', createdTodo: newTodo });
};

export const getTodos: RequestHandler = (request, response, next) => {
  response.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (request, response, next) => {
  const todoId = request.params.id;

  const updatedText = (<{ text: string }>request.body).text;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) throw new Error("Couldn't find your todo :( ");

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  response.json({ message: 'Updated !', updateTodo: TODOS[todoIndex] });
};
export const deleteTodo: RequestHandler<{ id: string }> = (request, response, next) => {
  const todoId = request.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) throw new Error("Couldn't find your todo :( ");

  TODOS.splice(todoIndex, 1);
  response.json({ message: 'Todo Deleted' });
};
