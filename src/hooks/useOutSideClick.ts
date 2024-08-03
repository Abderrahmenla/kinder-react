import { useEffect, RefObject, useCallback } from 'react';

const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
  exceptionRef?: RefObject<HTMLElement>
): void => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (exceptionRef?.current && exceptionRef.current.contains(event.target as Node)) {
          return;
        }
        callback();
      }
    },
    [ref, callback, exceptionRef]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
};
export default useOutsideClick;
