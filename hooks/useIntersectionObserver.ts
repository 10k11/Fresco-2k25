import { useState, useEffect, useRef, RefObject } from 'react';

interface ObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

function useIntersectionObserver<T extends HTMLElement>(
  options: ObserverOptions = {}
): [RefObject<T>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);
  const { root = null, rootMargin = '0px', threshold = 0.1, triggerOnce = true } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else {
            if (!triggerOnce) {
               setIsIntersecting(false);
            }
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      if(element) {
         observer.unobserve(element);
      }
    };
  // We only want this to run once on mount, or if the options change.
  // Using ref.current in dependency array is not recommended, so we trust the element is stable.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root, rootMargin, threshold, triggerOnce]); 

  return [ref, isIntersecting];
}

export default useIntersectionObserver;
