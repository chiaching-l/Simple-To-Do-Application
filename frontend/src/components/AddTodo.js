import React, { useState } from 'react';

// onAdd props form App.js
const AddTodo = ({ onAdd }) => {

  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task === '') return; 
    onAdd(task);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex' }}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ flex: 1, padding: '10px', fontSize: '16px' }}
      />
      <button 
        type="submit" 
        style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: 'green', color: 'white', border: 'none'}}
      >
        Add
      </button>
    </form>
  );
};

export default AddTodo;