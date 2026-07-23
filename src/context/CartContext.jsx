import { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'shopzone.cart';

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload.id);
    case 'INCREMENT':
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case 'DECREMENT':
      return state
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  const incrementQty = (id) => dispatch({ type: 'INCREMENT', payload: { id } });
  const decrementQty = (id) => dispatch({ type: 'DECREMENT', payload: { id } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    incrementQty,
    decrementQty,
    clearCart,
    itemCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
