import { useEffect } from 'react';

export default function useRedo(ctrlPressed, callback) {
  useEffect(() => {
    const keydownEventHandler = function({ keyCode }) {
      if (ctrlPressed) {
        /* Control + Y key - Redo */
        if (keyCode === 89) callback();
      }
    };

    document.addEventListener('keydown', keydownEventHandler);
    return () => {
      document.removeEventListener('keydown', keydownEventHandler);
    };
  });
};
