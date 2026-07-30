import SEO from '../../components/SEO/SEO';
import ProductCatalog from '../../components/ProductCatalog/ProductCatalog';
import Reveal from '../../components/Reveal/Reveal';
import './Products.css';

function Products() {
  return (
    <>
      <SEO
        title="Products &amp; Services"
        description="Explore ThinkMetric's portfolio of wind LiDAR, atmospheric LiDAR, and autonomous remote power systems."
        path="/products"
      />

      <section className="page-hero page-hero--light" />

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
