import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { location } from '../../data/siteContent';
import countryBorders from '../../data/countryBorders.json';
import './TurkeyMap.css';

const ISTANBUL_CENTER = [location.lat, location.lng];
const FIT_PADDING = [24, 24];

const TURKEY_ISO = 'TUR';

const COLORS = {
  turkey: '#4e6e5d',
  turkeyBorder: 'rgba(78, 110, 93, 0.6)',
};

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
  const markerRef = useRef(null);
  const popupRef = useRef(null);
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

    // Fit the view to Turkey's own shape (not the whole 9-country box) so
    // it stays the clear visual focus at rest, with a small pad for context.
    const regionBounds = L.geoJSON(countryBorders, {
      filter: (feature) => feature.id === TURKEY_ISO,
    }).getBounds().pad(0.2);
    map.fitBounds(regionBounds, { padding: FIT_PADDING });

    const marker = L.marker(ISTANBUL_CENTER, { icon: createMarkerIcon() });
    markerRef.current = marker;
    marker.on('click', () => {
      window.open(location.directionsUrl, '_blank', 'noopener,noreferrer');
    });

    const popup = L.popup({
      closeButton: false,
      closeOnClick: false,
      autoClose: false,
      className: 'turkey-map__popup',
      offset: [0, -14],
    }).setLatLng(ISTANBUL_CENTER).setContent('<strong>Istanbul</strong><span>Türkiye</span>');
    popupRef.current = popup;

    const enter = () => {
      marker.addTo(map);
      popup.addTo(map);
    };

    const leave = () => {
      map.removeLayer(marker);
      map.removeLayer(popup);
    };

    // A translucent tint over Turkey — real geography stays legible
    // underneath while still marking the country as the hoverable focus.
    L.geoJSON(countryBorders, {
      filter: (feature) => feature.id === TURKEY_ISO,
      style: {
        fillColor: COLORS.turkey,
        fillOpacity: 0.3,
        color: COLORS.turkeyBorder,
        weight: 1.5,
      },
      onEachFeature: (feature, layer) => {
        layer.on('mouseover', enter);
        layer.on('mouseout', leave);
      },
    }).addTo(map);

    // The map's container can still be resizing (flex-stretch layout,
    // Reveal fade-in) after Leaflet reads its initial size — keep it synced.
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
      map.fitBounds(regionBounds, { padding: FIT_PADDING, animate: false });
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
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
