import { useEffect } from 'react';

export default function useEnter(callback) {
  useEffect(() => {
    const keydownEventHandler = function({ keyCode }) {
      if (keyCode === 13) callback();
    };

    document.addEventListener('keydown', keydownEventHandler);
    return () => {
      document.removeEventListener('keydown', keydownEventHandler);
    };
  });
};
