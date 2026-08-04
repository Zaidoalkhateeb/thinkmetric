import { useEffect, useRef, useState } from 'react';
import AtmosphericOverlay from '../AtmosphericOverlay/AtmosphericOverlay';
import './HeroMedia.css';

/**
 * Full-viewport hero background. Uses the approved cinematic wind-turbine
 * video, muted and looping, with a static poster fallback for
 * prefers-reduced-motion and for browsers where autoplay is blocked.
 */
function HeroMedia() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReduced) return;
    video.play().catch(() => {
      // Autoplay blocked — the poster frame remains visible, which is an
      // acceptable, non-broken fallback per the brief.
    });
  }, [prefersReduced]);

  return (
    <div className="hero-media">
      {prefersReduced ? (
        <picture>
          <source srcSet="/media/thinkmetric-hero-poster-clean.webp" type="image/webp" />
          <img
            src="/media/thinkmetric-hero-poster-clean.jpg"
            alt="Wind turbine rising through low atmospheric fog on open terrain"
            className="hero-media__poster"
          />
        </picture>
      ) : (
        <video
          ref={videoRef}
          className="hero-media__video"
          poster="/media/thinkmetric-hero-poster-clean.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/media/thinkmetric-hero-clean.webm" type="video/webm" />
          <source src="/media/thinkmetric-hero-clean.mp4" type="video/mp4" />
        </video>
      )}

      <div className="hero-media__gradient" />
      {!prefersReduced && <AtmosphericOverlay />}
    </div>
  );
}

export default HeroMedia;
