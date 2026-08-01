// Custom line-icon set for ThinkMetric's technology categories plus a
// few supporting marks. All drawn on a shared 40-unit grid with a consistent
// 1.6 stroke weight and rounded joins so the set reads as one family.

const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function WindLidarIcon(props) {
  return (
    <svg viewBox="0 0 40 40" width="30" height="30" {...common} {...props}>
      {/* mast + sensor head */}
      <path d="M20 34V15" />
      <circle cx="20" cy="11" r="4" />
      {/* three measurement beams sweeping outward */}
      <path d="M20 11 L8 22" />
      <path d="M20 11 L20 26" />
      <path d="M20 11 L32 22" />
      {/* range arcs */}
      <path d="M11 30c5 3 13 3 18 0" opacity="0.55" />
      <path d="M7 34c8 4 18 4 26 0" opacity="0.35" />
    </svg>
  );
}

export function MetMastIcon(props) {
  return (
    <svg viewBox="0 0 40 40" width="30" height="30" {...common} {...props}>
      {/* lattice tower */}
      <path d="M20 4 12 34M20 4l8 30" />
      <path d="M14.6 24h10.8M13 29h14M16.4 19h7.2" />
      {/* guy wires */}
      <path d="M20 4 8 34M20 4l12 30" opacity="0.45" />
      <path d="M6 34h28" />
    </svg>
  );
}

export function RemotePowerIcon(props) {
  return (
    <svg viewBox="0 0 40 40" width="30" height="30" {...common} {...props}>
      {/* solar panel */}
      <rect x="8" y="8" width="20" height="13" rx="1.4" />
      <path d="M8 12.3h20M8 16.7h20M14.7 8v13M21.3 8v13" opacity="0.7" />
      <path d="M18 21v5" />
      {/* stored-power bolt, same stroke weight as the rest of the set */}
      <path d="M21 26.5h-5l3.6 5.6h-4.6l3.6 5.4" />
    </svg>
  );
}

export function LocationIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...common} {...props}>
      <path d="M12 22s7-7.2 7-12.5A7 7 0 0 0 5 9.5C5 14.8 12 22 12 22Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  );
}

export function DocumentIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...common} {...props}>
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}

export function CampaignIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...common} {...props}>
      <path d="M3 18v-3l7-7 3 3-7 7Z" />
      <path d="M13 8l3-3 3 3-3 3" />
      <path d="M3 21h18" />
    </svg>
  );
}
