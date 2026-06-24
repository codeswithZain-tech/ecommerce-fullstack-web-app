import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedItems = localStorage.getItem('savedForLater');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedItems) setSaved(JSON.parse(savedItems));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('savedForLater', JSON.stringify(saved));
  }, [saved]);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item._id !== id));
  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart((prev) => prev.map((item) => (item._id === id ? { ...item, qty } : item)));
  };
  const clearCart = () => setCart([]);

  const saveForLater = (product) => {
    removeFromCart(product._id);
    setSaved((prev) => {
      if (prev.find((p) => p._id === product._id)) return prev;
      return [...prev, product];
    });
  };

  const moveToCart = (product) => {
    setSaved((prev) => prev.filter((p) => p._id !== product._id));
    addToCart(product, 1);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        saved,
        cartCount,
        subtotal,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        saveForLater,
        moveToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
