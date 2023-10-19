import { useReducer, useState } from 'react';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';

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


export default function TodoList() {
  const [todoList, dispatch] = useReducer(todoReducer, []);
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

  const handleAddTodo = (newTodo) => {
    const todo = {
      id: Math.floor(Math.random() * 10000),
      value: newTodo,
      marked: false,
    };
    dispatch({ type: 'ADD_TODO', todo });
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', id });
    setEditMode(false);
  };

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setEditMode(true);
  };

  const handleSaveEdit = (newTodo) => {
    dispatch({ type: 'EDIT_TODO', id: editTodo.id, value: newTodo });
    setEditMode(false);
    setEditTodo(null);
  };

  const handleEditCheckBox = (id) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, marked: !todo.marked };
      }
      return todo;
    });
    dispatch({ type: 'EDIT_TODO', id, updatedTodoList });
  };

  return (
    <div className='App'>
      <h1>TODO List</h1>
      <AddTodo onAdd={handleAddTodo} />
      <ul>
        {todoList.map((todo) => (
          <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={handleEditTodo} 
          onEditCheckBox={handleEditCheckBox}
          onDelete={handleDeleteTodo}
        />
        
        ))}
      </ul>
      {editMode && (
        <div>
          <input
            type='text'
            value={editTodo.value}
            onChange={(e) => setEditTodo({ ...editTodo, value: e.target.value })}
          />
          <button onClick={() => handleSaveEdit(editTodo.value)}>Save Edit</button>
        </div>
      )}
    </div>
  );
}
