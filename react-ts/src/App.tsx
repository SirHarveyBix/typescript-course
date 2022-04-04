import React, { useState } from 'react';

import NewToDo from './components/NewToDo';
import ToDoList from './components/ToDoList';
import { Todo } from './todo.model';

const App: React.FC = () => {
  const dummyTodos = [
    { id: 't1', text: 'finishing the course' },
    { id: 't2', text: 'learing typescript' },
  ];
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string): void => {
    setTodos([{ id: Math.random().toString(), text: text }]);
  };
  return (
    <div className="App">
      <NewToDo onAddTodo={todoAddHandler} />
      <ToDoList items={dummyTodos} />
    </div>
  );
};

export default App;
