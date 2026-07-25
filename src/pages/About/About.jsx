import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../../components/SEO/SEO';
import Reveal from '../../components/Reveal/Reveal';
import { about } from '../../data/siteContent';
import './About.css';

function About() {
  return (
    <>
      <SEO
        title="About ThinkMetric"
        description="ThinkMetric supplies environmental measurement, remote monitoring, and autonomous power solutions for the renewable energy and industrial sectors."
        path="/about"
      />

      <section className="page-hero about-hero">
        <div className="container">
          <Reveal variant="fade">
            <span className="eyebrow">Who We Are</span>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h1 className="page-hero__title">{about.heroHeading}</h1>
          </Reveal>
          <Reveal variant="up" delay={160}>
            <p className="page-hero__lede">{about.paragraphs[0]}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container about-body">
          <Reveal as="div" variant="left" className="about-body__text">
            <h2>Reliable data begins with reliable equipment.</h2>
            {about.paragraphs.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal as="div" variant="right" delay={120} className="about-body__media">
            <picture>
              <source srcSet="/images/field-turbine-fog.webp" type="image/webp" />
              <img
                src="/images/field-turbine-fog.jpg"
                alt="Wind turbine emerging through low atmospheric fog, illustrating remote measurement conditions"
                loading="lazy"
              />
            </picture>
          </Reveal>
        </div>
      </section>

      <section className="section section--inverse">
        <div className="container">
          <Reveal variant="fade">
            <span className="eyebrow eyebrow--inverse">Principles</span>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h2 className="home-section__title about-principles__title">What guides how we select technology.</h2>
          </Reveal>
          <div className="about-principles">
            {about.principles.map((p, i) => (
              <Reveal key={p.title} variant="up" delay={i * 110}>
                <div className="about-principle">
                  <span className="mono about-principle__number">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-cta">
        <div className="container about-cta__inner">
          <Reveal variant="scale">
            <h2>Explore the portfolio, or start a conversation.</h2>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <div className="about-cta__actions">
              <Link to="/products" className="btn btn--primary">
                Explore Products <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/contact" className="btn btn--secondary">
                Contact ThinkMetric
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default About;
