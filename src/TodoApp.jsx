import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "./style.css";
import db from "./firebase.js";

// Firestore imports
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc
} from "firebase/firestore";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Reference to collection in Firestore
  const todosCollection = collection(db, "todos");

  // Load todos in real-time from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(todosCollection, (snapshot) => {
      const items = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setTodos(items);
    });

    return () => unsubscribe();
  }, []);

  // Add todo to Firestore
  const addTodo = async () => {
    if (input.trim() === "") return;

    await addDoc(todosCollection, {
      text: input,
      completed: false,
    });

    setInput("");
  };

  // Delete todo from Firestore
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  // Toggle complete
  const toggleComplete = async (id, currentValue) => {
    await updateDoc(doc(db, "todos", id), {
      completed: !currentValue,
    });
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
            toggleComplete={() =>
              toggleComplete(todo.id, todo.completed)
            }
          />
        ))}
      </ul>
    </div>
  );
}
s