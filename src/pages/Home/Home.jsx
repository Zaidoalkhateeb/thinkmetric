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
import { about, brand, contact, location, categories, siteUrl } from '../../data/siteContent';
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
            Measure the invisible — decide with confidence
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
          <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="home-hero__location">
            {location.label}
          </a>
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
          <Reveal variant="up" delay={80}>
            <h2 className="home-section__title">Four technology categories, one measurement portfolio</h2>
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

      <section className="section section--fog">
        <div className="container">
          <Reveal variant="fade">
            <span className="eyebrow">From Field to Decision</span>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h2 className="home-section__title">How the portfolio supports a measurement campaign</h2>
          </Reveal>
          <div className="home-process">
            <ProcessSteps />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal variant="fade">
            <span className="eyebrow">Atmospheric Intelligence</span>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h2 className="home-section__title">Sense what moves through the atmosphere</h2>
          </Reveal>
          <Reveal variant="up" delay={140}>
            <p className="home-section__lede">
              An illustrated look at what our portfolio is designed to measure — from surface wind to the
              atmospheric column above it. Educational, not live telemetry.
            </p>
          </Reveal>
          <Reveal variant="scale" delay={180}>
            <ScanReveal />
          </Reveal>
        </div>
      </section>

      <section className="section section--inverse home-about-preview">
        <div className="container home-about-preview__grid">
          <Reveal as="div" variant="left" className="home-about-preview__media">
            <picture>
              <source srcSet="/images/field-turbine-hills.webp" type="image/webp" />
              <img
                src="/images/field-turbine-hills.jpg"
                alt="Wind turbine standing on open grassland, viewed from above"
                loading="lazy"
              />
            </picture>
          </Reveal>
          <Reveal as="div" variant="right" delay={100} className="home-about-preview__body">
            <span className="eyebrow eyebrow--inverse">About ThinkMetric</span>
            <h2>Reliable data begins with reliable equipment</h2>
            <p>{about.paragraphs[0]}</p>
            <p>{about.paragraphs[2]}</p>
            <Link to="/about" className="btn btn--on-dark">
              Discover ThinkMetric <ArrowRight size={16} aria-hidden="true" />
            </Link>
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

      <section className="section home-cta">
        <div className="container home-cta__inner">
          <Reveal variant="scale">
            <h2>Planning a measurement campaign?</h2>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <p>Tell us about the environment, measurement objective, and deployment requirements.</p>
          </Reveal>
          <Reveal variant="up" delay={180}>
            <div className="home-cta__actions">
              <Link to="/contact" className="btn btn--ghost-on-dark">
                Start a Conversation
              </Link>
              <a href={`mailto:${contact.salesEmail}`} className="home-cta__email">
                {contact.salesEmail}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default Home;
