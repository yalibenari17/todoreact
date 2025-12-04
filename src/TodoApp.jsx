import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "./style.css";

export default function TodoApp() {

  // בעת טעינת העמוד — נבדוק אם יש משימות שמורות ב-localStorage
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // סטייט של האינפוט
  const [input, setInput] = useState("");

  // כל שינוי ב-todos → נשמור אוטומטית ב-localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // פונקציית הוספה
  const addTodo = () => {
    if (input.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  // מחיקה
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // סימון ביצוע
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="todo-container">
      <h2>רשימת משימות</h2>

      <div className="add-row">
        <input
          type="text"
          placeholder="הוסף משימה..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo}>הוסף</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
          />
        ))}
      </ul>
    </div>
  );
}
