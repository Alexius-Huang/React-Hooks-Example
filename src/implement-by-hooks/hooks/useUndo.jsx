import { useEffect } from 'react';

export default function useUndo(ctrlPressed, callback) {
  useEffect(() => {
    const keydownEventHandler = function({ keyCode }) {
      if (ctrlPressed) {
        /* Control + Z key - Undo */
        if (keyCode === 90) callback();
      }
    };

    document.addEventListener('keydown', keydownEventHandler);
    return () => {
      document.removeEventListener('keydown', keydownEventHandler);
    };
  });
};
