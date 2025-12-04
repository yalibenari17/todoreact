export default function TodoItem({ todo, deleteTodo, toggleComplete }) {
  return (
    <li className="todo-item">
      
      {/* צ'קבוקס סימון */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />

      {/* טקסט המשימה */}
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          opacity: todo.completed ? 0.6 : 1,
        }}
      >
        {todo.text}
      </span>

      {/* כפתור מחיקה */}
      <button onClick={() => deleteTodo(todo.id)}>מחק</button>
    </li>
  );
}
