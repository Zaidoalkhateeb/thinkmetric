import './WindScene.css';

const TURBINES = [
  { id: 't1', x: 300, y: 705, scale: 0.62, duration: 8.5, delay: -1.2 },
  { id: 't2', x: 760, y: 690, scale: 1.35, duration: 9.5, delay: -4.6 },
  { id: 't3', x: 1180, y: 715, scale: 0.5, duration: 7.8, delay: -2.1 },
  { id: 't4', x: 1420, y: 725, scale: 0.38, duration: 8.2, delay: -6.4 },
];

function Turbine({ x, y, scale, duration, delay }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-5,0 L-3,-190 L3,-190 L5,0 Z" className="wind-scene__tower" />
      <g
        className="wind-scene__rotor"
        style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
      >
        <path d="M0,0 C-6,-16 -13,-55 0,-64 C13,-55 6,-16 0,0 Z" transform="rotate(0)" />
        <path d="M0,0 C-6,-16 -13,-55 0,-64 C13,-55 6,-16 0,0 Z" transform="rotate(120)" />
        <path d="M0,0 C-6,-16 -13,-55 0,-64 C13,-55 6,-16 0,0 Z" transform="rotate(240)" />
      </g>
      <rect x="-4" y="-196" width="20" height="12" rx="3" className="wind-scene__nacelle" />
      <circle cx="0" cy="0" r="3.4" className="wind-scene__hub" />
    </g>
  );
}

/**
 * Fully illustrated, animated hero scene: gradient sky, drifting fog, layered
 * hill silhouettes, and wind turbines with genuinely rotating blades (not
 * just decorative arrows/scan-lines). Replaces a static photo so the motion
 * is real rather than simulated. Pausable and prefers-reduced-motion aware.
 */
function WindScene({ paused = false }) {
  return (
    <div className={`wind-scene ${paused ? 'wind-scene--paused' : ''}`} aria-hidden="true">
      <div className="wind-scene__sky" />
      <div className="wind-scene__fog wind-scene__fog--1" />
      <div className="wind-scene__fog wind-scene__fog--2" />
      <div className="wind-scene__fog wind-scene__fog--3" />

      <svg className="wind-scene__stage" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
        <path
          d="M0,640 C220,590 420,660 660,620 C900,580 1120,650 1360,610 C1460,594 1540,600 1600,612 V900 H0 Z"
          className="wind-scene__hill wind-scene__hill--far"
        />
        <path
          d="M0,700 C260,660 480,730 760,690 C1000,656 1260,720 1600,680 V900 H0 Z"
          className="wind-scene__hill wind-scene__hill--near"
        />

        {TURBINES.map((t) => (
          <Turbine key={t.id} {...t} />
        ))}
      </svg>
    </div>
  );
}

export default WindScene;
