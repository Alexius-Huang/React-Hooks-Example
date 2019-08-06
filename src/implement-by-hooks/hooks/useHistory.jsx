import { useState, useEffect } from 'react';

export default function useHistory(list, ctrlPressed) {
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

  return [history, historyIndex, setHistory, setHistoryIndex];
}