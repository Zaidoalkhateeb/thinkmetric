import { Fragment, useMemo, useState } from 'react';
import { products } from '../../data/products';
import { categories } from '../../data/siteContent';
import ProductCard from '../ProductCard/ProductCard';
import './ProductCatalog.css';

const ALL_CATEGORIES = { slug: 'all', shortLabel: 'All categories' };

function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(
    () => products.filter((p) => activeCategory === 'all' || p.categorySlug === activeCategory),
    [activeCategory]
  );

  return (
    <div className="product-catalog">
      <div className="product-catalog__controls">
        <div className="product-catalog__filters" role="group" aria-label="Filter by category">
          {[ALL_CATEGORIES, ...categories].map((cat, i) => (
            <Fragment key={cat.slug}>
              {i > 0 && (
                <span className="category-tab__divider" aria-hidden="true">
                  |
                </span>
              )}
              <button
                type="button"
                className={`category-tab ${activeCategory === cat.slug ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.slug)}
                aria-pressed={activeCategory === cat.slug}
              >
                {cat.shortLabel}
              </button>
            </Fragment>
          ))}
        </div>
      </div>

      <p className="product-catalog__count" role="status">
        {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
      </p>

      {filtered.length > 0 ? (
        <div className="product-catalog__grid">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="product-catalog__empty">
          <p>No products in this category yet.</p>
          <p className="product-catalog__empty-sub">Try a different category.</p>
          <button type="button" className="btn btn--secondary btn--sm" onClick={() => setActiveCategory('all')}>
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCatalog;
