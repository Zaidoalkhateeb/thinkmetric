import { useEffect, useState } from 'react';
import { products } from '../../data/products';
import './ApplicationsRibbon.css';

function ApplicationsRibbon() {
  const [reduced, setReduced] = useState(false);

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
    <div className={`ribbon ${reduced ? 'ribbon--static' : ''}`}>
      <div className="ribbon__track" role="list" aria-label="Supported applications">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="ribbon__item" role="listitem">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ApplicationsRibbon;
