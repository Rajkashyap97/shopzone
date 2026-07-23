import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-image">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        <span className="product-card-tag">${product.price}</span>
      </div>
      <div className="product-card-body">
        <span className="eyebrow">{product.category}</span>
        <h3>{product.title}</h3>
      </div>
    </Link>
  );
}
