import React, { useState } from 'react';
import { Plus, Check, X, Edit3, Calendar, Star, Trash2, Filter } from 'lucide-react';
import './App.css';
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        important: false,
        createdAt: new Date().toLocaleDateString()
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
    }
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const toggleImportant = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, important: !todo.important } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditValue(text);
  };

  const saveEdit = () => {
    if (editValue.trim()) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editValue.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    if (filter === 'important') return todo.important;
    return true;
  });

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    important: todos.filter(t => t.important).length,
    active: todos.filter(t => !t.completed).length
  };

  return (
    <div className="todo-container">
      <div className="todo-inner">

        <div className="todo-header">
          <h1 className="todo-title">Nest</h1>
          <p className="todo-subtitle">Organize your life, one task at a time</p>
        </div>

        <div className="todo-stats">
          <div className="stat-card"><div>{stats.total}</div><span>Total</span></div>
          <div className="stat-card completed"><div>{stats.completed}</div><span>Completed</span></div>
          <div className="stat-card important"><div>{stats.important}</div><span>Important</span></div>
          <div className="stat-card active"><div>{stats.active}</div><span>Active</span></div>
        </div>

        <div className="todo-add">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button onClick={addTodo} className="add-btn"><Plus size={20} /></button>
        </div>

        <div className="todo-filters">
          {['all', 'active', 'completed', 'important'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`filter-btn ${filter === filterType ? 'active' : ''}`}
            >
              <Filter size={14} /> {filterType}
            </button>
          ))}
        </div>

        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty">
              <div className="emoji">🎯</div>
              <p>{filter === 'all' ? 'No tasks yet. Add one above!' : `No ${filter} tasks found.`}</p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'done' : ''}`}>
                <button onClick={() => toggleComplete(todo.id)} className="complete-btn">
                  {todo.completed && <Check size={14} />}
                </button>

                <div className="todo-text">
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={handleEditKeyPress}
                      autoFocus
                    />
                  ) : (
                    <>
                      <p className={todo.completed ? 'line' : ''}>{todo.text}</p>
                      <div className="meta">
                        <Calendar size={12} />
                        <span>{todo.createdAt}</span>
                        {todo.important && (
                          <span className="mark"><Star size={12} />Important</span>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="todo-actions">
                  {editingId === todo.id ? (
                    <>
                      <button onClick={saveEdit} className="icon green"><Check size={18} /></button>
                      <button onClick={cancelEdit} className="icon red"><X size={18} /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => toggleImportant(todo.id)} className={`icon ${todo.important ? 'yellow' : 'gray'}`}>
                        <Star size={18} />
                      </button>
                      <button onClick={() => startEdit(todo.id, todo.text)} className="icon blue"><Edit3 size={18} /></button>
                      <button onClick={() => deleteTodo(todo.id)} className="icon red"><Trash2 size={18} /></button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="todo-footer">Stay organized and productive with TaskFlow</div>
      </div>
    </div>
  );
};

export default TodoApp;
