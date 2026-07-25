import { useEffect, useRef, useState } from 'react';
import './Reveal.css';

/**
 * Scroll-triggered reveal wrapper. Adds a "is-visible" class once the
 * element enters the viewport, driving a fade + slide-up transition in CSS.
 * Fully respects prefers-reduced-motion (content is shown immediately,
 * unanimated) and never hides content from screen readers — the element
 * is always present in the DOM and only opacity/transform are animated.
 */
function Reveal({ as: Tag = 'div', children, className = '', delay = 0, variant = 'up', once = true }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
