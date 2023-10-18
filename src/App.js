import React, { useReducer, useState } from 'react';

// Reducer function
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.todo];
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, value: action.value } : todo
      );
    default:
      return state;
  }
};

export default function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todoList, dispatch] = useReducer(todoReducer, []);
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  const addItem = () => {
    if (!newTodo) {
      alert('Enter a valid Todo!!!');
    } else if (!editMode) {
      const todo = {
        id: Math.floor(Math.random() * 10000),
        value: newTodo,
        marked: false,
      };
      dispatch({ type: 'ADD_TODO', todo });
    } else {
      dispatch({ type: 'EDIT_TODO', id: editTodoId, value: newTodo });
      setEditMode(false);
    }

    setNewTodo('');
  };

  const deleteItem = (id) => {
    dispatch({ type: 'DELETE_TODO', id });
    setEditMode(false);
    setNewTodo('');
  };

  const editModeHandler = (todo) => {
    setNewTodo(todo.value);
    setEditMode(true);
    setEditTodoId(todo.id);
  };

  return (
    <div className='App'>
      <h1>TODO List</h1>
      <input
        type='text'
        placeholder='TODO goes here'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      {!editMode && (
        <button onClick={addItem}>Add TODO</button>
      )}

      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <input
              type='checkbox'
              checked={todo.marked}
              onChange={() => !todo.marked}
            />
            {todo.value}
            {!editMode ? (
              <button
                style={{ background: 'blue', color: 'white', border: 'unset' }}
                onClick={() => editModeHandler(todo)}
              >
                Edit
              </button>
            ) : (
              <button
                style={{ background: 'blue', color: 'white', border: 'unset' }}
                onClick={() => addItem()}
              >
                Add Edited item
              </button>
            )}
            <button
              style={{ background: 'red', color: 'white', border: 'unset' }}
              onClick={() => deleteItem(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
