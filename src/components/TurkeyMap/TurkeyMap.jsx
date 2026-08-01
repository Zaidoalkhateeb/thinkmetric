import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { location } from '../../data/siteContent';
import './TurkeyMap.css';

const ISTANBUL_CENTER = [location.lat, location.lng];
const ISTANBUL_ZOOM = 11;
// Fraction of the container's width to shift the view east of the pin, so
// more of Istanbul itself — not just Başakşehir — fills the frame. Done as
// a pixel shift proportional to the actual rendered width (via panBy)
// rather than a fixed degree offset, so the pin and its popup stay clear
// of the left edge on narrow mobile cards, not just the wide desktop one.
const VIEW_SHIFT_FRACTION = 0.22;

function applyView(map, container) {
  map.setView(ISTANBUL_CENTER, ISTANBUL_ZOOM, { animate: false });
  const shiftX = container.clientWidth * VIEW_SHIFT_FRACTION;
  map.panBy([shiftX, 0], { animate: false });
}

// CARTO's free Voyager basemap — real geography, roads and place labels,
// no account or API key required (unlike Mapbox/Google).
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

function createMarkerIcon() {
  return L.divIcon({
    className: 'turkey-map__marker-icon',
    html: '<span class="turkey-map__pulse"></span><span class="turkey-map__pin"></span>',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function TurkeyMap() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Lazy-load: don't construct the map until it has scrolled near the viewport.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !containerRef.current || mapRef.current) return undefined;

    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
      tap: false,
    });
    mapRef.current = map;

    L.tileLayer(TILE_URL, { subdomains: 'abcd', maxZoom: 19 }).addTo(map);

    // Center and zoom on Istanbul itself so the real map tiles fill the
    // whole frame — no stylized country overlay to leave gaps.
    applyView(map, containerRef.current);

    const marker = L.marker(ISTANBUL_CENTER, { icon: createMarkerIcon() }).addTo(map);
    marker.on('click', () => {
      window.open(location.directionsUrl, '_blank', 'noopener,noreferrer');
    });

    const popup = L.popup({
      closeButton: false,
      closeOnClick: false,
      autoClose: false,
      className: 'turkey-map__popup',
      offset: [0, -14],
    })
      .setLatLng(ISTANBUL_CENTER)
      .setContent(`<strong>${location.city}</strong><span>${location.country}</span>`)
      .addTo(map);

    // The map's container can still be resizing (flex-stretch layout,
    // Reveal fade-in) after Leaflet reads its initial size — keep it synced.
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
      applyView(map, containerRef.current);
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      popup.remove();
      marker.remove();
      map.remove();
      mapRef.current = null;
    };
  }, [inView]);

  return (
    <div className="turkey-map">
      <div className="turkey-map__surface">
        <div ref={containerRef} className="turkey-map__canvas" />
      </div>
    </div>
  );
}

export default TurkeyMap;
