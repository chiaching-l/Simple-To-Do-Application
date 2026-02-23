import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todo, onUpdate, onDelete, onEdit }) => {
// msg for no tasks
  if (todo.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>
        No to-dos available. Add a new task above!
      </p>
    );
  }

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {/* Iterate through the todo array and render a TodoItem for each */}
      {todo.map(item => (
        <TodoItem
          key={item.id}
          todo={item}
          onToggle={onUpdate}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default TodoList;