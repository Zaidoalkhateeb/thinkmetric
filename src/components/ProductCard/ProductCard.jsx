import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categoryIcons } from '../IconMark/IconMark';
import { categories } from '../../data/siteContent';
import './ProductCard.css';

function ProductCard({ product }) {
  const category = categories.find((c) => c.slug === product.categorySlug);
  const Icon = category ? categoryIcons[category.icon] : null;

  return (
    <article className="product-card">
      <Link to={`/products/detail/${product.slug}`} className="product-card__link">
        <div className="product-card__media">
          {product.image ? (
            <img src={product.image} alt={product.modelName} loading="lazy" />
          ) : (
            <div className="product-card__placeholder" aria-hidden="true">
              {Icon && <Icon />}
              <span className="mono">Product visual placeholder</span>
            </div>
          )}
          <span className="product-card__arrow" aria-hidden="true">
            <ArrowUpRight size={16} />
          </span>
        </div>

        <div className="product-card__body">
          <span className="product-card__type">{product.productType}</span>
          <h3 className="product-card__title">{product.modelName}</h3>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;
