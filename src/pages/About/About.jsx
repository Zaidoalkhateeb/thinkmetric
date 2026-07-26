import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../../components/SEO/SEO';
import Reveal from '../../components/Reveal/Reveal';
import ScrollIndicator from '../../components/ScrollIndicator/ScrollIndicator';
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
        <picture className="about-hero__photo" aria-hidden="true">
          <source srcSet="/images/field-turbine-sunset.webp" type="image/webp" />
          <img src="/images/field-turbine-sunset.jpg" alt="" loading="eager" />
        </picture>
        <div className="about-hero__tint" aria-hidden="true" />
        <div className="about-hero__scrim" aria-hidden="true" />
        <div className="container">
          <Reveal variant="fade">
            <span className="eyebrow">Who We Are</span>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h1 className="page-hero__title">
              Reliable Soltuions  
 
              <br />
              Reliable Data
            </h1>
          </Reveal>
          <Reveal variant="up" delay={160}>
            <p className="page-hero__lede">{about.paragraphs[0]}</p>
          </Reveal>
          <Reveal variant="up" delay={220}>
            <Link to="/products" className="btn btn--primary about-hero__cta">
              Explore Products <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <ScrollIndicator />
      </section>

      <section className="section">
        <div className="container about-body">
          <Reveal as="div" variant="left" className="about-body__text">
            <h2>Reliable data begins with reliable equipment</h2>
            {about.paragraphs.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="about-body__trust">
            </p>
          </Reveal>
          <Reveal as="div" variant="right" delay={120} className="about-body__media">
            <picture>
              <source srcSet="/media/thinkmetric-hero-poster.webp" type="image/webp" />
              <img
                src="/media/thinkmetric-hero-poster.jpg"
                alt="Row of wind turbines across open terrain at sunrise"
                loading="lazy"
              />
            </picture>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal variant="fade">
            <span className="eyebrow">Principles</span>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h2 className="home-section__title about-principles__title">What guides how we select technology</h2>
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
    </>
  );
}

export default About;
