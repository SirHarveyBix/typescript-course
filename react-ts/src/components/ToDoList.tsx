import './TodoList.css';

import React from 'react';

interface ToDoListProps {
  items: {
    id: string;
    text: string;
  }[];
  onDeleteTodo: (id: string) => void;
}

const ToDoList: React.FC<ToDoListProps> = (props) => {
  const { items, onDeleteTodo } = props;

  return (
    <ul>
      {items.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text} </span>
          <button onClick={onDeleteTodo.bind(null, todo.id)}>DELETE</button>
        </li>
      ))}
    </ul>
  );
};

export default ToDoList;
