import { useState, useEffect, useRef } from 'react';

const useInView = (options = {}, delay = 0) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          setIsInView(true);
        }, delay);
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px'
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, options.threshold, options.rootMargin]);

  return { ref, isInView };
};

export default useInView;
