import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    clearCart();
    setPlaced(true);
  };

  if (placed) {
    return (
      <div className="container checkout-status">
        <span className="eyebrow">// order status: confirmed</span>
        <h1>Order placed. Thanks!</h1>
        <button className="btn btn-primary" onClick={() => navigate('/shop')}>
          Continue Shopping →
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container checkout-status">
        <span className="eyebrow">// cart status: empty</span>
        <h1>Nothing to check out yet.</h1>
        <Link to="/shop" className="btn btn-primary">Browse Shop →</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container checkout-grid">
        <div className="checkout-items">
          <span className="eyebrow">// protected route: /checkout</span>
          <h1>Review Order</h1>
          {cart.map((item) => (
            <div className="checkout-row" key={item.id}>
              <span>{item.title} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="checkout-summary">
          <div className="checkout-summary-row">
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <button className="btn btn-primary" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
