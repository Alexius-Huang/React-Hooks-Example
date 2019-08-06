import { useState, useEffect } from 'react';

export default function useCtrlPressed() {
  const [ctrlPressed, setCtrlPressed] = useState(false);

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

  return ctrlPressed;
}
