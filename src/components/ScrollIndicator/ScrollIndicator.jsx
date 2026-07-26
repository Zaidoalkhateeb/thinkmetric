import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './ScrollIndicator.css';

function ScrollIndicator() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <span className={`scroll-indicator ${atTop ? '' : 'scroll-indicator--hidden'}`} aria-hidden="true">
      <span className="scroll-indicator__mouse">
        <span className="scroll-indicator__wheel" />
      </span>
      <ChevronDown size={14} className="scroll-indicator__chevron" aria-hidden="true" />
      <span className="scroll-indicator__label mono">Scroll</span>
    </span>
  );
}

export default ScrollIndicator;
