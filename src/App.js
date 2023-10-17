import { useState } from "react";

function App() {
const [newTodo,setNewTodo]=useState('');
const [todos,SetTodos] = useState([])
const addItem = ()=>{
  if(!newTodo){
    alert('Enter the valid todo !!!');
    return;
  }
  const item = {
    id:Math.floor(Math.random()*10000),
    value:newTodo
  }
  SetTodos(oldList=>[...oldList,item]);
  setNewTodo('');
  console.log(todos)
}
 function deleteItem(id){
  SetTodos(todos.filter(todo=>todo.id!=id))
 }
  return (
    <div className="App">
      <h1>Todo List</h1>
      <input 
      type="text"
      placeholder="Add your todo"
      value={newTodo}
      onChange={e=>setNewTodo(e.target.value)}  />
      <button onClick={addItem}>Add todo</button>
      <ul>
        {todos.map(item=>{
          return (
            <li key={item.id}>
              {item.value}
              <button
               style={{background:'red', color:'white',border:'unset'}}
               onClick={()=>deleteItem(item.id)}>
                Delete
              </button>
            </li>)
        })}
      </ul>
    </div>
  );
}

export default App;
