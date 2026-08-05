import SEO from '../../components/SEO/SEO';
import ProductCatalog from '../../components/ProductCatalog/ProductCatalog';
import CategoryCtaTab from '../../components/CategoryCtaTab/CategoryCtaTab';
import Reveal from '../../components/Reveal/Reveal';
import { pageSeo } from '../../data/siteContent';
import './Products.css';

function Products() {
  return (
    <>
      <SEO {...pageSeo.products} />

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
