<div className="app-container">
  <h1>רשימת משימות</h1>

  <div className="input-area">
    <input 
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="מה לעשות?"
    />
    <button className="add-btn" onClick={addTodo}>הוסף</button>
  </div>

  {todos.map((t) => (
    <div className="task" key={t.id}>
      <span className="task-text">{t.text}</span>
      <button className="delete-btn" onClick={() => deleteTodo(t.id)}>מחק</button>
    </div>
  ))}
</div>
