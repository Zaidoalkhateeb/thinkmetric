import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, ChevronRight, Home } from 'lucide-react';
import SEO from '../../components/SEO/SEO';
import ProductCard from '../../components/ProductCard/ProductCard';
import CategoryCtaTab from '../../components/CategoryCtaTab/CategoryCtaTab';
import Reveal from '../../components/Reveal/Reveal';
import { categories } from '../../data/siteContent';
import { getProductsByCategory } from '../../data/products';
import './ProductCategory.css';

function ProductCategory() {
  const { categorySlug } = useParams();
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) return <Navigate to="/products" replace />;

  const products = getProductsByCategory(category.slug);

  return (
    <>
      <SEO
        title={category.label}
        description={category.description}
        path={`/products/${category.slug}`}
      />

      <section className={`page-hero category-hero ${category.heroImage ? 'category-hero--photo' : ''}`}>
        {category.heroImage && (
          <>
            <div className="category-hero__photo" aria-hidden="true">
              <img src={category.heroImage} alt="" loading="eager" />
            </div>
            <div className="category-hero__tint" aria-hidden="true" />
          </>
        )}
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumbs">
            <Link to="/">
              <Home size={13} aria-hidden="true" /> Home
            </Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link to="/products">Products</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">{category.label}</span>
          </nav>

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
              <span className="eyebrow category-products__eyebrow">Products in this category</span>
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

      <CategoryCtaTab categoryLabel={category.label} />
    </>
  );
}

export default ProductCategory;
