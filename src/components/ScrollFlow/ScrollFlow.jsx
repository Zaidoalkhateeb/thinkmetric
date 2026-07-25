import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ScrollFlow.css';

/**
 * A slim scroll-tied "measurement" indicator running down the page edge —
 * a small, literal nod to the brand ("measure the flow" as you move through
 * the page) rather than another fade-in. The fill tracks scroll position
 * directly, so it's driven by the person's own action rather than looping
 * on its own, which keeps it comfortable even for reduced-motion users.
 */
function ScrollFlow() {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);
  const location = useLocation();

  useEffect(() => {
    setProgress(0);
  }, [location.pathname]);

  useEffect(() => {
    const update = () => {
      ticking.current = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="scroll-flow" aria-hidden="true">
      <div className="scroll-flow__track">
        <div className="scroll-flow__fill" style={{ transform: `scaleY(${progress})` }} />
        <div className="scroll-flow__marker" style={{ top: `${progress * 100}%` }} />
      </div>
    </div>
  );
}

export default ScrollFlow;
