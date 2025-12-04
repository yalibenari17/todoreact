export default function TodoItem({ todo, deleteTodo, toggleComplete }) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleComplete}
      />

      <span style={{
        textDecoration: todo.completed ? "line-through" : "none",
        opacity: todo.completed ? 0.6 : 1
      }}>
        {todo.text}
      </span>

      <button onClick={() => deleteTodo(todo.id)}>מחק</button>
    </li>
  );
}
