'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal - IntersectionObserver hook for scroll-triggered animations.
 * Returns [ref, isVisible]. Once visible, stays visible (no re-trigger).
 */
export default function useScrollReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px' } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // Only trigger once
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
