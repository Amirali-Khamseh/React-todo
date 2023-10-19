export default function TodoItem({ todo, onEditCheckBox, onEdit, onDelete }) {
  return (
    <li key={todo.id}>
      <input
        type='checkbox'
        checked={todo.marked}
        onChange={()=>onEditCheckBox(todo.id)}
      />
      <span style={{ textDecoration: todo.marked ? 'line-through' : 'none' }}>
        {todo.value}
      </span>
      <button
        style={{ background: 'blue', color: 'white', border: 'unset' }}
        onClick={() => onEdit(todo)}
      >
        Edit
      </button>
      <button
        style={{ background: 'red', color: 'white', border: 'unset' }}
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </button>
    </li>
  );
}
