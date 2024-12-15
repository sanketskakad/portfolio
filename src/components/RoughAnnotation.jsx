import React, { useEffect, useRef } from 'react';
import { annotate } from 'rough-notation';

/**
 * Reusable RoughAnnotation wrapper with looping animation
 */
export default function RoughAnnotation({
  type = 'underline',
  color = '#2997ff',
  show = true,
  strokeWidth = 2.5,
  animationDuration = 900,
  iterations = 2,
  brackets = ['left', 'right'],
  loop = true,
  loopInterval = 3500,
  children,
  className = '',
  multiline = true,
}) {
  const elementRef = useRef(null);
  const annotationRef = useRef(null);

  const drawAnnotation = () => {
    if (!elementRef.current) return;

    if (annotationRef.current) {
      try {
        annotationRef.current.remove();
      } catch (e) {}
      annotationRef.current = null;
    }

    const config = {
      type,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      multiline,
    };

    if (type === 'bracket') {
      config.brackets = brackets;
    }

    annotationRef.current = annotate(elementRef.current, config);
    annotationRef.current.show();
  };

  useEffect(() => {
    if (!show) return;

    const initialTimer = setTimeout(() => {
      drawAnnotation();
    }, 100);

    let intervalId = null;
    if (loop) {
      intervalId = setInterval(() => {
        drawAnnotation();
      }, loopInterval);
    }

    return () => {
      clearTimeout(initialTimer);
      if (intervalId) clearInterval(intervalId);
      if (annotationRef.current) {
        try {
          annotationRef.current.remove();
        } catch (e) {}
      }
    };
  }, [type, color, show, strokeWidth, animationDuration, iterations, loop, loopInterval, JSON.stringify(brackets), multiline]);

  return (
    <span ref={elementRef} className={`inline-block relative ${className}`}>
      {children}
    </span>
  );
}
