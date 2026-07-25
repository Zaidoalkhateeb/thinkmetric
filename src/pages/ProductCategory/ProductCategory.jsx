import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SEO from '../../components/SEO/SEO';
import ProductCard from '../../components/ProductCard/ProductCard';
import Reveal from '../../components/Reveal/Reveal';
import { categoryIcons } from '../../components/IconMark/IconMark';
import { categories } from '../../data/siteContent';
import { getProductsByCategory } from '../../data/products';
import './ProductCategory.css';

function ProductCategory() {
  const { categorySlug } = useParams();
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) return <Navigate to="/products" replace />;

  const products = getProductsByCategory(category.slug);
  const Icon = categoryIcons[category.icon];

  return (
    <>
      <SEO
        title={category.label}
        description={category.description}
        path={`/products/${category.slug}`}
      />

      <section className="page-hero category-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumbs">
            <Link to="/products">Products &amp; Services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{category.label}</span>
          </nav>

          <div className="category-hero__top">
            <span className="category-hero__icon">
              <Icon aria-hidden="true" />
            </span>
            <span className="mono category-hero__number">{category.number}</span>
          </div>
          <h1 className="page-hero__title">{category.label}</h1>
          <p className="page-hero__lede">{category.description}</p>

          <ul className="category-hero__tags">
            {category.applications.map((app) => (
              <li key={app} className="tag-pill">
                {app}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {category.pending ? (
            <div className="category-pending">
              <p>Detailed portfolio information is being prepared. Contact our team to discuss your measurement or power requirements.</p>
              <Link to={`/contact?type=sales&product=${encodeURIComponent(category.label)}`} className="btn btn--primary">
                Talk to Sales <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <>
              <span className="eyebrow">Models in this category</span>
              <h2 className="home-section__title">{products.length} products available to explore.</h2>
              <div className="product-catalog__grid">
                {products.map((p, i) => (
                  <Reveal key={p.slug} variant="up" delay={(i % 6) * 70}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="section section--fog">
        <div className="container category-guidance">
          <h2>Choosing the right solution</h2>
          <p>
            The right technology depends on your measurement objective, site conditions, and deployment
            constraints. Our technical team can help you evaluate fit within this category before you commit
            to a configuration.
          </p>
          <Link to={`/contact?type=technical&product=${encodeURIComponent(category.label)}`} className="btn btn--secondary">
            Request a Technical Discussion
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Link to="/products" className="category-back">
            <ArrowLeft size={16} aria-hidden="true" /> Back to all products &amp; services
          </Link>
        </div>
      </section>
    </>
  );
}

export default ProductCategory;
