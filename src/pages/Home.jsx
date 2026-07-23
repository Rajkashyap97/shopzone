import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">// inventory pipeline: live</span>
          <h1>
            Browse the catalog.
            <br />
            Build your cart.
            <br />
            <span className="hero-accent">Ship the order.</span>
          </h1>
          <p>
            ShopZone is a single-page storefront — every route, every add-to-cart,
            every checkout step runs client-side. No reloads, no lost state.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary">
              Browse Shop →
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-panel-row">
            <span>ROUTE</span>
            <span>/shop</span>
          </div>
          <div className="hero-panel-row">
            <span>STATE</span>
            <span>CartContext</span>
          </div>
          <div className="hero-panel-row">
            <span>PERSIST</span>
            <span>localStorage</span>
          </div>
          <div className="hero-panel-row">
            <span>AUTH</span>
            <span>Guest Mock</span>
          </div>
          <div className="hero-panel-footer">STATUS: OPERATIONAL</div>
        </div>
      </div>
    </div>
  );
}
