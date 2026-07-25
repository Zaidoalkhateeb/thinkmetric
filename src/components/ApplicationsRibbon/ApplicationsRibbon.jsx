import { useEffect, useState } from 'react';
import { applications } from '../../data/siteContent';
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

  const items = [...applications, ...applications];

  return (
    <div className={`ribbon ${reduced ? 'ribbon--static' : ''}`} role="list" aria-label="Supported applications">
      <div className="ribbon__track">
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
