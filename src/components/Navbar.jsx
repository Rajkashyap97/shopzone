import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { itemCount } = useCart();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">SZ</span>
          <span className="brand-name">ShopZone</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => (isActive ? 'active' : '')}>
            Shop
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
            Contact
          </NavLink>
          <NavLink to="/checkout" className={({ isActive }) => (isActive ? 'active' : '')}>
            Checkout
          </NavLink>
        </nav>

        <div className="nav-actions">
          {isAuthenticated ? (
            <button className="btn btn-outline" onClick={logout}>
              Log out
            </button>
          ) : (
            <NavLink to="/login" className="btn btn-outline">
              Log in
            </NavLink>
          )}

          <NavLink to="/cart" className="cart-stamp" aria-label="View cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
              <path d="M2.5 3h2l2.2 12.2a2 2 0 0 0 2 1.6h8.1a2 2 0 0 0 2-1.6L21 7.5H6" />
            </svg>
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </NavLink>
        </div>
      </div>
    </header>
  );
}
