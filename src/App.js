import React, { useState } from 'react'


export default function App() {
  //States decleration
  const [newTodo, setNewTodo] = useState('');
  const [todoList, SetTodoList] = useState([]);
  const [editMode,setEditMode] =useState(false);
  //Adding an Item to the list 
  const addItem = () => {
    if(!newTodo){
      alert('Enter the valid Todo !!!')
    }
    const todo = {
      id: Math.floor(Math.random() * 10000),
      value: newTodo,
      marked:false,
    }
    SetTodoList(prev => [...prev, todo]);
    setNewTodo('');
  }
  //Removing the list item based on its id 
  const deleteItem = (id)=>{
    SetTodoList(todoList.filter(todo=>todo.id!==id))
    setEditMode(false);
    setNewTodo('');
  }
  //Edit mode
  const editModehandler = (todo)=>{
    setNewTodo(todo);
    setEditMode(true);
  }
  //Add edited item
  const AddEdited = (id)=>{
    deleteItem(id);
    SetTodoList(prevTodos=>{
      return [...prevTodos,{id,value:newTodo}];
    })
    setNewTodo('');
    setEditMode(false)
  }
  //JSX 
  return (
    <div className='App'>
      <h1>TODO List</h1>
      <input
        type="text"
        placeholder='TODO goes here'
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      {!editMode && 
          <button
            onClick={addItem}
          >
            Add TODO
          </button>
      }
      

      <ul>
        {todoList.map(todo => {
           return(
                <li key={todo.id}>
                  <input type='checkbox' checked={todo.marked} onChange={()=>!todo.marked}/>
                  {todo.value}
                  {!editMode ? 
                  <button style={{background:'blue', color:'white',border:'unset'}}
                  onClick={()=>editModehandler(todo.value)}
                  >
                    Edit
                  </button> :
                  <button style={{background:'blue', color:'white',border:'unset'}}
                  onClick={()=>AddEdited(todo.id)}
                  >
                    Add Edited item
                  </button> } 
                  <button style={{background:'red', color:'white',border:'unset'}}
                  onClick={()=>deleteItem(todo.id)}>
                    Delete
                  </button>
                </li>
              )
        })}
      </ul>
    </div>
  )
}
