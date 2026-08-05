import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../../components/SEO/SEO';
import { pageSeo } from '../../data/siteContent';
import './NotFound.css';

function NotFound() {
  return (
    <>
      <SEO {...pageSeo.notFound} noIndex />
      <section className="not-found">
        <div className="container not-found__inner">
          <svg viewBox="0 0 200 120" className="not-found__illus" role="img" aria-label="Signal lost illustration">
            <path d="M0 100 H200" className="not-found__ground" />
            <line x1="100" y1="100" x2="100" y2="20" className="not-found__mast" />
            <circle cx="100" cy="20" r="16" className="not-found__ring" />
            <circle cx="100" cy="20" r="30" className="not-found__ring" />
            <path d="M70 60 L130 60" className="not-found__break" strokeDasharray="4 6" />
          </svg>
          <span className="mono not-found__code">404</span>
          <h1>Signal not found</h1>
          <p>The page you&apos;re looking for doesn&apos;t exist, or may have moved.</p>
          <Link to="/" className="btn btn--primary">
            <ArrowLeft size={16} aria-hidden="true" /> Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}

export default NotFound;
