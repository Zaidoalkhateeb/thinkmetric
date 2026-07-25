import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categoryIcons } from '../IconMark/IconMark';
import './CategoryGateway.css';

function CategoryGateway({ category }) {
  const Icon = categoryIcons[category.icon];

  return (
    <Link to={`/products/${category.slug}`} className="cat-gateway">
      <span className="cat-gateway__number mono">{category.number}</span>
      <span className="cat-gateway__icon">
        <Icon aria-hidden="true" />
      </span>
      <h3 className="cat-gateway__title">{category.label}</h3>
      <p className="cat-gateway__desc">{category.description}</p>
      <span className="cat-gateway__link">
        Explore category <ArrowUpRight size={16} aria-hidden="true" />
      </span>
    </Link>
  );
}

export default CategoryGateway;
