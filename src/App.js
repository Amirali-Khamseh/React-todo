import { useState } from "react";

function App() {
const [newTodo,setNewTodo]=useState('');
const [todos,SetTodos] = useState([]);
const [editStatus,setEditStatus] = useState(true);
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
 function editMode(id){
  todos.forEach(item => {
    if(item.id===id){
      setNewTodo(item.value);
      setEditStatus(false);
    }})
 }
 const addEditedTodo = (id)=>{
  deleteItem(id);
  SetTodos(prevTodos => {
    return [...prevTodos,{id,value:newTodo}] 
  })
  setNewTodo('');
  setEditStatus(true);
  
 }
  return (
    <div className="App">
      <h1>Todo List</h1>
      <input 
      type="text"
      placeholder="Add your todo"
      value={newTodo}
      onChange={e=>setNewTodo(e.target.value)}  />
     {editStatus&&<button onClick={addItem}>Add todo</button>} 
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
              {editStatus ?  <button
               style={{background:'blue', color:'white',border:'unset'}}
               onClick={()=>editMode(item.id)}>
                Edit
              </button>:  <button
               style={{background:'blue', color:'white',border:'unset'}}
               onClick={()=>addEditedTodo(item.id)}>
                Add edited item
              </button>}
            
            </li>)
        })}
      </ul>
    </div>
  );
}

export default App;
