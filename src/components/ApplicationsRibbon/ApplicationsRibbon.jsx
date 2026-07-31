import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { products } from '../../data/products';
import './ApplicationsRibbon.css';

function ApplicationsRibbon() {
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const productNames = products.map((p) => p.modelName);
  const items = [...productNames, ...productNames];

  return (
    <div className={`ribbon ${reduced ? 'ribbon--static' : ''} ${paused ? 'ribbon--paused' : ''}`}>
      <div className="ribbon__track" role="list" aria-label="Supported applications">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="ribbon__item" role="listitem">
            {item}
          </span>
        ))}
      </div>
      {!reduced && (
        <button
          type="button"
          className="ribbon__toggle"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? 'Resume the scrolling application list' : 'Pause the scrolling application list'}
        >
          {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}

export default ApplicationsRibbon;
