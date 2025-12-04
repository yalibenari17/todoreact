// src/TodoApp.jsx
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { db } from "./firebase.js"; // ⭐ חובה עם .js
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // בעת טעינת העמוד - מאזין אוטומטי לשינויים ב-Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "todos"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(list);
    });

    return () => unsub(); // מנקה מאזין
  }, []);

  // הוספת משימה
  async function addTodo() {
    if (input.trim() === "") return;
    await addDoc(collection(db, "todos"), { text: input });
    setInput("");
  }

  // מחיקת משימה
  async function deleteTodo(id) {
    await deleteDoc(doc(db, "todos", id));
  }

  return (
    <div className="container">
      <h1>רשימת משימות</h1>

      <div className="inputBox">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="הוסף משימה..."
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
