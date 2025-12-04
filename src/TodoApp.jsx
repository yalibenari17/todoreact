// src/TodoApp.jsx
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem.jsx";
import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";

export default function TodoApp() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  // טעינת משימות בזמן אמת
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "todos"), (snapshot) => {
      const allTodos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(allTodos);
    });

    return () => unsub();
  }, []);

  // הוספה
  async function addTodo() {
    if (input.trim() === "") return;
    await addDoc(collection(db, "todos"), { text: input });
    setInput("");
  }

  // מחיקה
  async function deleteTodo(id) {
    await deleteDoc(doc(db, "todos", id));
  }

  return (
    <div className="container">
      <h1>רשימת משימות</h1>

      <div className="inputBox">
        <input
          placeholder="הוסף משימה..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo}>הוסף</button>
      </div>

      <ul>
        {todos.map((t) => (
          <TodoItem key={t.id} item={t} onDelete={() => deleteTodo(t.id)} />
        ))}
      </ul>
    </div>
  );
}
