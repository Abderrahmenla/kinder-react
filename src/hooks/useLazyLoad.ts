import { useState, useEffect, RefObject } from 'react';

type useLazyLoadType = (
  refs: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  delay?: number
) => boolean[];

const useLazyLoad: useLazyLoadType = (refs, delay = 0) => {
  const [isLoaded, setIsLoaded] = useState<boolean[]>(
    Array.isArray(refs) ? Array(refs.length).fill(false) : [false]
  );

  useEffect(() => {
    const updateLoadedState = (index: number) => {
      setIsLoaded((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    };

    const setupObserver = (ref: RefObject<HTMLElement>, index: number) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const timeout = setTimeout(() => {
                updateLoadedState(index);

                observer.unobserve(entry.target);
              }, delay);

              return () => {
                clearTimeout(timeout);
              };
            }
          });
        },
        { threshold: 0.2 }
      );

      const currentElement = ref.current;
      if (currentElement) {
        observer.observe(currentElement);
      }

      return observer;
    };

    const observers: IntersectionObserver[] = [];

    if (Array.isArray(refs)) {
      refs.forEach((ref, index) => {
        observers.push(setupObserver(ref, index));
      });
    } else {
      observers.push(setupObserver(refs as RefObject<HTMLElement>, 0));
    }

    return () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
    };
  }, [refs, delay]);

  return isLoaded;
};

export default useLazyLoad;
