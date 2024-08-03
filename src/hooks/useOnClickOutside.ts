import { RefObject, useEffect } from 'react';

const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: (event: Event) => void) => {
  useEffect(() => {
    const listener = (event: Event) => {
      // Cast event.target to the Element type
      const targetEl = event.target as Element; // clicked element

      // Do nothing if clicked element is the drawer or a menu item
      if (!ref.current || ref.current.contains(targetEl) || targetEl.closest('.menu-item')) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
