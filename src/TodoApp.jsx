// src/TodoApp.jsx

import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

export default function TodoApp() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks from Firestore in real time
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const tasksArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksArray);
    });

    return () => unsub();
  }, []);

  // Add a new task to Firestore
  const addTask = async () => {
    if (input.trim() === "") return;
    await addDoc(collection(db, "tasks"), { text: input.trim() });
    setInput("");
  };

  // Delete a task
  const removeTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  return (
    <div className="app-container">
      <h1 className="title">רשימת משימות</h1>

      <div className="input-row">
        <input
          className="task-input"
          placeholder="מה קורה..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="add-btn" onClick={addTask}>
          הוסף
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {task.text}
            <button className="delete-btn" onClick={() => removeTask(task.id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
