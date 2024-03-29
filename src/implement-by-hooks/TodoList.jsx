import React, { useState, useEffect } from 'react';
import useCtrlPressed from './hooks/useCtrlPressed';
import useHistory from './hooks/useHistory';
import useUndo from './hooks/useUndo';
import useRedo from './hooks/useRedo';
import useEnter from './hooks/useEnter';
import '../css/TodoList.css';

const initialList = [
  { title: 'Planning Travel', done: false },
  { title: 'Learn React Hooks', done: false },
  { title: 'Go to Gym', done: true },
  { title: 'Find Job', done: false },
  { title: 'Watch Movie', done: true },
];

export default function TodoList() {
  const [newItem, setNewItem] = useState('');
  const [list, setList] = useState(initialList);

  const ctrlPressed = useCtrlPressed();
  const [history, historyIndex, setHistory, setHistoryIndex] = useHistory(list, ctrlPressed);

  /* Press Enter and append new item */
  useEnter(() => {
    if (newItem !== '') {
      const newList = Array.from(list);
      newList.unshift({ title: newItem, done: false });
      setList(newList);
      setNewItem('');
    }
  });

  /* Implement 'undo' and 'redo' mechanism */
  useUndo(ctrlPressed, () => {
    if (historyIndex > 0) {
      const newHistoryIndex = historyIndex - 1;
      const previousList = history[newHistoryIndex];

      setList(previousList);
      setHistoryIndex(newHistoryIndex);
    }
  });

  useRedo(ctrlPressed, () => {
    if (historyIndex + 1 < history.length) {
      const newHistoryIndex = historyIndex + 1;
      const nextList = history[newHistoryIndex];

      setList(nextList);
      setHistoryIndex(newHistoryIndex);
    }
  });

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
