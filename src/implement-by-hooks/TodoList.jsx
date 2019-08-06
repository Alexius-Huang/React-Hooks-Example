import React, { useState, useEffect } from 'react';
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

  const [ctrlPressed, setCtrlPressed] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  /* Everytime list is updated, new history appended */
  useEffect(() => {
    /*
      Because undo and redo will change the current list state,
      we need to prevent from modifying the history
    */
    if (ctrlPressed) return;

    let newHistory = Array.from(history);
    const newHistoryIndex = historyIndex + 1;

    /*
      If the history has been undone and new record appended,
      then we need to clear out the future records and then
      push the new one. 
    */
    if (history.length > historyIndex + 1) {
      newHistory = newHistory.slice(0, newHistoryIndex);
    }
    newHistory.push(list);

    setHistory(newHistory);
    setHistoryIndex(newHistoryIndex);
  }, [list]);

  /* Press Enter and append new item */
  useEffect(() => {
    const keydownEventHandler = function({ keyCode }) {
      /* Enter key - Create new item */
      if (keyCode === 13 && newItem !== '') {
        const newList = Array.from(list);
        newList.unshift({ title: newItem, done: false });
        setList(newList);
        setNewItem('');
      }
    };

    document.addEventListener('keydown', keydownEventHandler);
    return () => {
      document.removeEventListener('keydown', keydownEventHandler);
    };
  });

  /* Detect Control key pressed */
  useEffect(() => {
    const keyupEventHandler = function({ keyCode }) {
      if (keyCode === 17) setCtrlPressed(false);
    };

    const keydownEventHandler = function({ keyCode }) {
      if (keyCode === 17) setCtrlPressed(true);
    };

    document.addEventListener('keydown', keydownEventHandler);
    document.addEventListener('keyup', keyupEventHandler);
    return () => {
      document.removeEventListener('keydown', keydownEventHandler);
      document.removeEventListener('keyup', keyupEventHandler);
    };
  });

  /* Implement 'undo' and 'redo' mechanism */
  useEffect(() => {
    const keydownEventHandler = function({ keyCode }) {
      if (ctrlPressed) {
        /* Control + Z key - Undo */
        if (keyCode === 90 && historyIndex > 0) {
          const newHistoryIndex = historyIndex - 1;
          const previousList = history[newHistoryIndex];

          setList(previousList);
          setHistoryIndex(newHistoryIndex);
        }

        /* Control + Y key - Redo */
        if (keyCode === 89 && historyIndex + 1 < history.length) {
          const newHistoryIndex = historyIndex + 1;
          const nextList = history[newHistoryIndex];

          setList(nextList);
          setHistoryIndex(newHistoryIndex);
        }
      }
    };

    document.addEventListener('keydown', keydownEventHandler);
    return () => {
      document.removeEventListener('keydown', keydownEventHandler);
    };
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
