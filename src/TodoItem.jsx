// src/TodoItem.jsx
export default function TodoItem({ item, onDelete }) {
  return (
    <li className="todo-item">
      <span>{item.text}</span>
      <button onClick={onDelete}>מחק</button>
    </li>
  );
}
