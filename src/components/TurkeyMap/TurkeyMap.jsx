import { useEffect, useRef, useState } from 'react';
import { location } from '../../data/siteContent';
import './TurkeyMap.css';

const ISTANBUL_CENTER = [location.lat, location.lng];
const ISTANBUL_ZOOM = 11;
const VIEW_SHIFT_FRACTION = 0.22;
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

function applyView(map, container) {
  const isNarrow = container.clientWidth < 480;
  map.setView(ISTANBUL_CENTER, isNarrow ? 10 : ISTANBUL_ZOOM, { animate: false });
  map.panBy([container.clientWidth * (isNarrow ? 0 : VIEW_SHIFT_FRACTION), 0], { animate: false });
}

function createMarkerIcon(L) {
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

    let disposed = false;
    let cleanupMap;

    async function initialiseMap() {
      const [{ default: L }] = await Promise.all([
        import('leaflet'),
        import('leaflet/dist/leaflet.css'),
      ]);
      if (disposed || !containerRef.current) return;

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
      applyView(map, containerRef.current);

      const marker = L.marker(ISTANBUL_CENTER, { icon: createMarkerIcon(L) }).addTo(map);
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

      const resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
        applyView(map, containerRef.current);
      });
      resizeObserver.observe(containerRef.current);

      cleanupMap = () => {
        resizeObserver.disconnect();
        popup.remove();
        marker.remove();
        map.remove();
        mapRef.current = null;
      };
    }

    initialiseMap();

    return () => {
      disposed = true;
      cleanupMap?.();
    };
  }, [inView]);

  return (
    <div className="turkey-map">
      <div className="turkey-map__surface">
        <div ref={containerRef} className="turkey-map__canvas" />
        <a
          className="turkey-map__open"
          href={location.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open map
        </a>
      </div>
    </div>
  );
}

export default TurkeyMap;
