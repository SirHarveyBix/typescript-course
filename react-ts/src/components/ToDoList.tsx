import React from 'react';

interface ToDoListProps {
  items: {
    id: string;
    text: string;
  }[];
}

const ToDoList: React.FC<ToDoListProps> = (props) => {
  const { items } = props;

  return (
    <ul>
      {items.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};

export default ToDoList;
