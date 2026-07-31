import SEO from '../../components/SEO/SEO';
import ProductCatalog from '../../components/ProductCatalog/ProductCatalog';
import CategoryCtaTab from '../../components/CategoryCtaTab/CategoryCtaTab';
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

      <section className="page-hero page-hero--light">
        <div className="container">
          <Reveal variant="up">
            <h1 className="page-hero__title products-catalog__title">Products &amp; Services</h1>
          </Reveal>
        </div>
      </section>

      <section className="section products-catalog-section">
        <div className="container">
          <ProductCatalog />
        </div>
      </section>

      <CategoryCtaTab categoryLabel="Products & Services" />
    </>
  );
}

export default Products;
