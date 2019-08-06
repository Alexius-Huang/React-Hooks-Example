import React, { useState } from 'react';
import '../css/TodoList.css';

export default function TodoList() {
  const [newItem, setNewItem] = useState('');
  const [list, setList] = useState([
    { title: 'Planning Travel', done: false },
    { title: 'Learn React Hooks', done: false },
    { title: 'Go to Gym', done: true },
    { title: 'Find Job', done: false },
    { title: 'Watch Movie', done: true },
  ]);

  function handleToggleItem(title) {
    const index = list.findIndex(item => item.title === title);
    const newList = Array.from(list);
    newList[index] = { title, done: !newList[index].done };
    setList(newList);
  }

  function handleRemoveItem(title) {
    const index = list.findIndex(item => item.title === title);
    const newList = Array.from(list);
    newList.splice(index, 1);
    setList(newList);
  }

  return (
    <div className="TodoList">
      <h1>My Todo List</h1>

      <input
        type="text"
        placeholder="Create New Item"
        value={newItem}
        onChange={(event) => setNewItem(event.target.value)}
      />

      <ul className="todo-list">
        {
          list.map(({ title, done }) => (
            <li className={done ? 'done' : ''} key={title}>
              <span className="content">{title}</span>

              <span className="btn-group">
                <button
                  className="done-btn"
                  onClick={() => handleToggleItem(title)}
                >{done ? 'Undo' : 'Done'}</button>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(title)}
                >Remove</button>
              </span>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
