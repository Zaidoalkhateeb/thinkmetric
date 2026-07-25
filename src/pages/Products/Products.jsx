import { Link } from 'react-router-dom';
import SEO from '../../components/SEO/SEO';
import CategoryGateway from '../../components/CategoryGateway/CategoryGateway';
import ProductCatalog from '../../components/ProductCatalog/ProductCatalog';
import Reveal from '../../components/Reveal/Reveal';
import { about, categories } from '../../data/siteContent';
import './Products.css';

function Products() {
  return (
    <>
      <SEO
        title="Products &amp; Services"
        description="Explore ThinkMetric's portfolio of wind LiDAR, meteorological mast, atmospheric LiDAR, and autonomous remote power systems."
        path="/products"
      />

      <section className="page-hero page-hero--light">
        <div className="container">
          <Reveal variant="fade">
            <span className="eyebrow">Products &amp; Services</span>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h1 className="page-hero__title">A curated portfolio for environmental measurement.</h1>
          </Reveal>
          <Reveal variant="up" delay={160}>
            <p className="page-hero__lede">{about.paragraphs[1]}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--fog">
        <div className="container">
          <Reveal variant="up">
            <h2 className="home-section__title">Four technology categories</h2>
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
            <span className="eyebrow">Full Catalog</span>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h2 className="home-section__title">Browse every product in the portfolio.</h2>
          </Reveal>
          <ProductCatalog />
        </div>
      </section>

      <section className="section section--inverse products-cta">
        <div className="container products-cta__inner">
          <Reveal variant="scale">
            <h2>Can&apos;t find what you need?</h2>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <p>Our technical team can help match a measurement or power requirement to the right solution.</p>
          </Reveal>
          <Reveal variant="up" delay={140}>
            <Link to="/contact" className="btn btn--ghost-on-dark">
              Talk to Our Team
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default Products;
