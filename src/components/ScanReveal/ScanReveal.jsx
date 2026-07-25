import { useState, useId } from 'react';
import { atmosphericModes } from '../../data/siteContent';
import './ScanReveal.css';

const illustrations = {
  wind: (
    <g>
      <path className="scan-illus__ground" d="M0 300 H480" />
      {[60, 130, 200].map((y, i) => (
        <g key={y}>
          <line x1="0" y1={y} x2="480" y2={y} className="scan-illus__gridline" />
          <path
            d={`M20 ${y} q40 -18 80 0 t80 0 t80 0 t80 0 t80 0`}
            className="scan-illus__flow"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        </g>
      ))}
      <rect x="230" y="60" width="4" height="240" className="scan-illus__mast" />
    </g>
  ),
  'boundary-layer': (
    <g>
      <rect x="0" y="40" width="480" height="80" className="scan-illus__layer" opacity="0.15" />
      <rect x="0" y="120" width="480" height="90" className="scan-illus__layer" opacity="0.3" />
      <rect x="0" y="210" width="480" height="90" className="scan-illus__layer" opacity="0.5" />
      <path d="M0 300 H480" className="scan-illus__ground" />
      <path d="M40 300 C 100 200, 60 120, 140 60" className="scan-illus__flow" />
      <path d="M420 300 C 360 200, 400 120, 320 60" className="scan-illus__flow" style={{ animationDelay: '0.5s' }} />
    </g>
  ),
  atmosphere: (
    <g>
      <path d="M0 300 H480" className="scan-illus__ground" />
      <line x1="240" y1="300" x2="240" y2="40" className="scan-illus__mast" />
      {[70, 120, 170, 220, 270].map((y, i) => (
        <circle key={y} cx="240" cy={y} r="3" className="scan-illus__dot" style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
      <circle cx="240" cy="55" r="24" className="scan-illus__ring" />
      <circle cx="240" cy="55" r="46" className="scan-illus__ring" style={{ animationDelay: '0.6s' }} />
      <circle cx="240" cy="55" r="70" className="scan-illus__ring" style={{ animationDelay: '1.2s' }} />
    </g>
  ),
  'remote-power': (
    <g>
      <path d="M0 300 H480" className="scan-illus__ground" />
      <rect x="190" y="70" width="100" height="60" rx="4" className="scan-illus__panel" />
      <line x1="200" y1="80" x2="280" y2="80" className="scan-illus__gridline" />
      <line x1="200" y1="95" x2="280" y2="95" className="scan-illus__gridline" />
      <line x1="200" y1="110" x2="280" y2="110" className="scan-illus__gridline" />
      <line x1="240" y1="130" x2="240" y2="300" className="scan-illus__mast" />
      <path
        d="M250 170 h-16 l26 44 h-16 l24 42"
        className="scan-illus__bolt"
      />
    </g>
  ),
};

function ScanReveal() {
  const [active, setActive] = useState(atmosphericModes[0].id);
  const baseId = useId();
  const activeMode = atmosphericModes.find((m) => m.id === active);

  return (
    <div className="scan-reveal">
      <div className="scan-reveal__tabs" role="tablist" aria-label="Atmospheric intelligence categories">
        {atmosphericModes.map((mode) => (
          <button
            key={mode.id}
            id={`${baseId}-tab-${mode.id}`}
            role="tab"
            type="button"
            aria-selected={active === mode.id}
            aria-controls={`${baseId}-panel-${mode.id}`}
            className={`scan-reveal__tab ${active === mode.id ? 'is-active' : ''}`}
            onClick={() => setActive(mode.id)}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <div className="scan-reveal__stage">
        <svg
          className="scan-illus"
          viewBox="0 0 480 320"
          role="img"
          aria-label={`Illustration representing ${activeMode.label.toLowerCase()}`}
        >
          {illustrations[active]}
        </svg>

        {atmosphericModes.map((mode) => (
          <div
            key={mode.id}
            id={`${baseId}-panel-${mode.id}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${mode.id}`}
            hidden={active !== mode.id}
            className="scan-reveal__panel"
          >
            <p className="scan-reveal__desc">{mode.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScanReveal;
