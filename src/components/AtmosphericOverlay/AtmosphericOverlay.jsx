import './AtmosphericOverlay.css';

/**
 * Decorative, purely illustrative SVG overlay suggesting wind-vector paths
 * and a LiDAR scan arc. Never presents live or fabricated telemetry.
 */
function AtmosphericOverlay({ paused = false, variant = 'hero' }) {
  return (
    <svg
      className={`atmo-overlay atmo-overlay--${variant} ${paused ? 'atmo-overlay--paused' : ''}`}
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g className="atmo-overlay__contours" opacity="0.5">
        <path d="M-50 560 C 250 500, 450 620, 750 540 S 1150 500, 1300 560" />
        <path d="M-50 610 C 250 550, 450 670, 750 590 S 1150 550, 1300 610" />
        <path d="M-50 660 C 250 600, 450 720, 750 640 S 1150 600, 1300 660" />
      </g>
      <g className="atmo-overlay__scan" opacity="0.5">
        <circle cx="1010" cy="150" r="46" />
        <circle cx="1010" cy="150" r="94" />
        <circle cx="1010" cy="150" r="150" />
      </g>
    </svg>
  );
}

export default AtmosphericOverlay;
