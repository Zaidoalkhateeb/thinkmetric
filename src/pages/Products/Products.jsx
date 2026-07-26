import SEO from '../../components/SEO/SEO';
import ProductCatalog from '../../components/ProductCatalog/ProductCatalog';
import Reveal from '../../components/Reveal/Reveal';
import { about } from '../../data/siteContent';
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
            <h1 className="page-hero__title">A curated portfolio for environmental measurement</h1>
          </Reveal>
          <Reveal variant="up" delay={160}>
            <p className="page-hero__lede">{about.paragraphs[1]}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal variant="up">
            <h2 className="home-section__title products-catalog__title">Products &amp; Services</h2>
          </Reveal>
          <ProductCatalog />
        </div>
      </section>
    </>
  );
}

export default Products;
