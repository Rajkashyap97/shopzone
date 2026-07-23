import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setJustAdded(false);

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setProduct(data);
          setStatus('success');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  if (status === 'loading') {
    return <div className="container detail-status">Loading product record…</div>;
  }

  if (status === 'error') {
    return (
      <div className="container detail-status">
        <p>We couldn't find product #{id}.</p>
        <Link to="/shop" className="btn btn-outline">← Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="container detail-grid">
        <div className="detail-image">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        <div className="detail-info">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="detail-price">${product.price}</p>
          <p className="detail-description">{product.description}</p>

          <div className="detail-meta">
            <div>
              <span>Rating</span>
              <strong>{product.rating} / 5</strong>
            </div>
            <div>
              <span>Stock</span>
              <strong>{product.stock} units</strong>
            </div>
            <div>
              <span>Brand</span>
              <strong>{product.brand || 'ShopZone'}</strong>
            </div>
          </div>

          <button className="btn btn-primary detail-add-btn" onClick={handleAddToCart}>
            {justAdded ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
