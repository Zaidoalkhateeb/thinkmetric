import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../../components/SEO/SEO';
import HeroMedia from '../../components/HeroMedia/HeroMedia';
import CategoryGateway from '../../components/CategoryGateway/CategoryGateway';
import ProcessSteps from '../../components/ProcessSteps/ProcessSteps';
import ScanReveal from '../../components/ScanReveal/ScanReveal';
import ApplicationsRibbon from '../../components/ApplicationsRibbon/ApplicationsRibbon';
import TurkeyMap from '../../components/TurkeyMap/TurkeyMap';
import Reveal from '../../components/Reveal/Reveal';
import { brand, contact, location, categories, siteUrl } from '../../data/siteContent';
import './Home.css';

function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    url: siteUrl,
    email: contact.generalEmail,
    telephone: contact.phoneDisplay,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city,
      addressCountry: 'TR',
    },
  };

  return (
    <>
      <SEO
        title="Wind LiDAR, Atmospheric &amp; Remote Power Measurement"
        description="ThinkMetric supplies wind LiDAR, atmospheric LiDAR, and autonomous remote power systems for wind resource assessment, atmospheric research, and industrial monitoring."
        path="/"
        jsonLd={jsonLd}
      />

      <section className="home-hero">
        <HeroMedia />
        <div className="container home-hero__inner">
          <Reveal as="h1" variant="up" className="home-hero__title">
            Measure the invisible,
            <br />
            decide with confidence
          </Reveal>
          <Reveal as="p" variant="up" delay={90} className="home-hero__desc">
            Advanced measurement and autonomous power technologies for wind, atmospheric, industrial, and
            remote field applications.
          </Reveal>
          <Reveal as="div" variant="up" delay={170} className="home-hero__actions">
            <Link to="/products" className="btn btn--ghost-on-dark">
              Explore Technologies <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn btn--on-dark">
              Talk to Our Team
            </Link>
          </Reveal>
        </div>
        <span className="home-hero__scroll-cue" aria-hidden="true">
          <span className="home-hero__scroll-cue-line" />
          Scroll
        </span>
      </section>

      <section className="section">
        <div className="container">
          <Reveal variant="fade">
            <span className="eyebrow">Products &amp; Services</span>
          </Reveal>
          <div className="home-gateways">
            {categories.map((cat, i) => (
              <Reveal key={cat.slug} variant="up" delay={i * 90}>
                <CategoryGateway category={cat} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal variant="fade">
            <span className="eyebrow">From Field to Decision</span>
          </Reveal>
          <div className="home-process">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal variant="scale">
            <ScanReveal />
          </Reveal>
        </div>
      </section>

      <section className="section--tight home-ribbon-wrap">
        <ApplicationsRibbon />
      </section>

      <section className="section">
        <div className="container home-location">
          <Reveal as="div" variant="left" className="home-location__body">
            <span className="eyebrow">Location</span>
            <h2 className="home-section__title">Based in Istanbul, Türkiye</h2>
            <p className="home-section__lede">
              Serving wind developers, researchers, and industrial operators from our home base at the
              crossroads of Europe and Asia.
            </p>
          </Reveal>
          <Reveal as="div" variant="right" delay={120} className="home-location__map">
            <TurkeyMap />
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default Home;
