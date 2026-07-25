import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { products } from '../../data/products';
import { categories } from '../../data/siteContent';
import ProductCard from '../ProductCard/ProductCard';
import './ProductCatalog.css';

function ProductCatalog() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.categorySlug === activeCategory;
      const matchesQuery =
        !q || p.modelName.toLowerCase().includes(q) || p.productType.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <div className="product-catalog">
      <div className="product-catalog__controls">
        <label className="product-catalog__search" htmlFor="product-search">
          <Search size={17} aria-hidden="true" />
          <span className="visually-hidden">Search products by model name or product type</span>
          <input
            id="product-search"
            type="search"
            placeholder="Search by model name or product type…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <div className="product-catalog__filters" role="group" aria-label="Filter by category">
          <button
            type="button"
            className={`filter-pill ${activeCategory === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('all')}
            aria-pressed={activeCategory === 'all'}
          >
            All categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              className={`filter-pill ${activeCategory === cat.slug ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(cat.slug)}
              aria-pressed={activeCategory === cat.slug}
            >
              {cat.shortLabel}
            </button>
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
          <p>No products match your search.</p>
          <p className="product-catalog__empty-sub">
            Try a different model name, product type, or clear the category filter.
          </p>
          <button
            type="button"
            className="btn btn--secondary btn--sm"
            onClick={() => {
              setQuery('');
              setActiveCategory('all');
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCatalog;
