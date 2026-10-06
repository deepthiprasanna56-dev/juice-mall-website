/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PROMO_CODES } from '../data/juiceData';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('juicemall_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [toast, setToast] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('juicemall_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [cartItems]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToast({ message, type, id });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3200);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f97316', '#10b981', '#fbbf24', '#ec4899', '#3b82f6']
      });
    } catch {
      // ignore
    }
  };

  const addToCart = (product, qty = 1, showFeedback = true) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });

    if (showFeedback) {
      showToast(`Added "${product.name}" to your cart! 🍊`);
    }
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (id) => {
    const item = cartItems.find((i) => i.id === id);
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      showToast(`Removed "${item.name}" from cart`, 'info');
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (codeToApply) => {
    const normalized = (codeToApply || couponCode).trim().toUpperCase();
    if (!normalized) {
      showToast('Please enter a coupon code', 'error');
      return false;
    }
    if (PROMO_CODES[normalized]) {
      setAppliedCoupon({
        code: normalized,
        ...PROMO_CODES[normalized]
      });
      triggerConfetti();
      showToast(`Coupon "${normalized}" applied! Saved ${PROMO_CODES[normalized].discountPercent}% 🎉`);
      return true;
    } else {
      showToast('Invalid coupon code. Try FRESHJUICE20', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const discountAmount = appliedCoupon
    ? (subtotal * appliedCoupon.discountPercent) / 100
    : 0;

  const freeDeliveryThreshold = 35.0;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const deliveryFee = cartItems.length === 0 ? 0 : isFreeDelivery ? 0 : 4.99;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        discountAmount,
        deliveryFee,
        total,
        isFreeDelivery,
        freeDeliveryThreshold,
        amountToFreeDelivery,
        isCartOpen,
        setIsCartOpen,
        couponCode,
        setCouponCode,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        toast,
        showToast,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        triggerConfetti
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
