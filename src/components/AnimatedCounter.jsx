import React, { useEffect, useState, useRef } from 'react';

export const AnimatedCounter = ({ target, suffix = '+', prefix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          let start = 0;
          const end = parseInt(target, 10);
          if (isNaN(end)) return;

          const totalFrames = Math.round(duration / 16);
          let currentFrame = 0;

          const counter = setInterval(() => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            // Ease out cubic function for ultra-smooth deceleration
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.round(start + (end - start) * easeOutProgress);

            if (currentFrame >= totalFrames) {
              setCount(end);
              clearInterval(counter);
            } else {
              setCount(currentCount);
            }
          }, 16);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={elementRef} className="tabular-nums transition-all duration-200">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};
