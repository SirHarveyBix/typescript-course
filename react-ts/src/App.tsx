import React, { useState } from 'react';

import NewToDo from './components/NewToDo';
import ToDoList from './components/ToDoList';
import { Todo } from './todo.model';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string): void => {
    setTodos((todos) => [...todos, { id: Math.random().toString(), text: text }]);
  };

  const todoDeleteHandler = (TodoId: string): void => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== TodoId);
    });
  };
  return (
    <div className="App">
      <NewToDo onAddTodo={todoAddHandler} />
      <ToDoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
};

export default App;
