import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './Shop.css';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      setStatus('loading');
      try {
        const res = await fetch('https://dummyjson.com/products?limit=30');
        if (!res.ok) throw new Error('Request failed');
        const data = await res.json();
        if (!cancelled) {
          setProducts(data.products);
          setStatus('success');
        }
      } catch (err) {
        if (!cancelled) setStatus('error');
      }
    }

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="shop-page">
      <div className="container">
        <div className="shop-header">
          <div>
            <span className="eyebrow">// GET /products</span>
            <h1>Shop Inventory</h1>
          </div>
          <input
            className="shop-search"
            type="text"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {status === 'loading' && <p className="shop-status">Fetching inventory…</p>}
        {status === 'error' && (
          <p className="shop-status shop-status-error">
            Could not reach the inventory API. Check your connection and refresh.
          </p>
        )}
        {status === 'success' && filtered.length === 0 && (
          <p className="shop-status">No products match "{query}".</p>
        )}

        {status === 'success' && filtered.length > 0 && (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
