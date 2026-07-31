import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './CategoryGateway.css';

function CategoryGateway({ category }) {
  return (
    <Link to={`/products/${category.slug}`} className="cat-gateway">
      <h3 className="cat-gateway__title">{category.label}</h3>
      {category.description && <p className="cat-gateway__desc">{category.description}</p>}
      <span className="cat-gateway__link">
        Explore category <ArrowUpRight size={16} aria-hidden="true" />
      </span>
    </Link>
  );
}

export default CategoryGateway;
