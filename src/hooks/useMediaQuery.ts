import { useState, useCallback, useEffect } from 'react';

export const UseMediaQuery = (width: number): boolean => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    if (media.matches) {
      setTargetReached(true);
    }

    const mediaListener = (e: MediaQueryListEvent) => {
      updateTarget(e);
    };

    media.addEventListener('change', mediaListener);

    return () => {
      media.removeEventListener('change', mediaListener);
    };
  }, []);

  return targetReached;
};
