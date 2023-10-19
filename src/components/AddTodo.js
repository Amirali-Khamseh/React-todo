import { useState } from 'react';

export default function AddTodo({ onAdd }) {
  const [newTodo, setNewTodo] = useState('');

  const addItem = () => {
    if (!newTodo) {
      alert('Enter a valid Todo!!!');
    } else {
      onAdd(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div>
      <input
        type='text'
        placeholder='TODO goes here'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addItem}>Add TODO</button>
    </div>
  );
}
