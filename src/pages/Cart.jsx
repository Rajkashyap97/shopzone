import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
  const { cart, incrementQty, decrementQty, removeFromCart, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container cart-empty">
        <span className="eyebrow">// cart status: empty</span>
        <h1>Your cart has nothing in it yet.</h1>
        <Link to="/shop" className="btn btn-primary">Browse Shop →</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <span className="eyebrow">// {cart.length} line item(s)</span>
        <h1>Your Cart</h1>

        <div className="cart-list">
          {cart.map((item) => (
            <div className="cart-row" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <div className="cart-row-info">
                <Link to={`/product/${item.id}`}>{item.title}</Link>
                <span>${item.price} each</span>
              </div>
              <div className="cart-qty">
                <button onClick={() => decrementQty(item.id)} aria-label="Decrease quantity">−</button>
                <span>{item.quantity}</span>
                <button onClick={() => incrementQty(item.id)} aria-label="Increase quantity">+</button>
              </div>
              <div className="cart-row-total">${(item.price * item.quantity).toFixed(2)}</div>
              <button className="cart-remove" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <button className="btn btn-outline" onClick={clearCart}>Clear Cart</button>
          <div className="cart-summary-total">
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <Link to="/checkout" className="btn btn-primary">Proceed to Checkout →</Link>
        </div>
      </div>
    </div>
  );
}
