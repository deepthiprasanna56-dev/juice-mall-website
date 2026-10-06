import { useCart } from '../context/CartContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  Tag
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    deliveryFee,
    total,
    freeDeliveryThreshold,
    amountToFreeDelivery,
    couponCode,
    setCouponCode,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-sm transition-opacity">
      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 dark:border-stone-800 animate-slideLeft">
        
        {/* Top Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
            <h3 className="font-extrabold text-lg text-stone-900 dark:text-white">
              Your Juice Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Cart"
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Goal Bar */}
        <div className="bg-orange-50/80 dark:bg-orange-950/40 px-5 py-3 border-b border-orange-100 dark:border-stone-800">
          <div className="flex items-center justify-between text-xs font-bold text-stone-800 dark:text-stone-200 mb-1.5">
            <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400">
              <Truck className="w-4 h-4" />
              <span>
                {amountToFreeDelivery > 0
                  ? `Add $${amountToFreeDelivery.toFixed(2)} more for FREE Chilled Delivery`
                  : '🎉 You unlocked FREE Chilled Delivery!'}
              </span>
            </div>
            <span>{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Scrollable Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <span className="text-6xl block">🍹</span>
              <h4 className="font-extrabold text-xl text-stone-900 dark:text-white">
                Your juice cart is empty
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mx-auto">
                Explore our fresh cold-pressed bottles, antioxidant smoothies, or build a custom blend!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-6 py-3 rounded-full bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors cursor-pointer"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-extrabold text-sm text-stone-900 dark:text-white truncate">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-stone-400 block mb-1.5">{item.size}</span>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm text-orange-600 dark:text-orange-400">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-900">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-orange-500 text-stone-600 dark:text-stone-300 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-black text-stone-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-orange-500 text-stone-600 dark:text-stone-300 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                  className="p-2 text-stone-400 hover:text-rose-500 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/90 space-y-4">
            
            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Coupon "{appliedCoupon.code}" applied (-{appliedCoupon.discountPercent}%)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-rose-500 font-bold ml-2 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. FRESHJUICE20)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white uppercase focus:ring-2 focus:ring-orange-400 outline-none"
                    />
                  </div>
                  <button
                    onClick={() => applyCoupon(couponCode)}
                    className="px-3.5 py-2 rounded-xl bg-stone-800 dark:bg-stone-700 hover:bg-stone-900 text-white font-bold text-xs cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-stone-900 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Discount ({appliedCoupon.discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Chilled Delivery</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 dark:border-stone-800 text-sm font-black text-stone-900 dark:text-white">
                <span>Estimated Total</span>
                <span className="text-lg text-orange-600 dark:text-orange-400">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={clearCart}
                className="w-full py-1.5 text-center text-xs font-semibold text-stone-400 hover:text-rose-500 transition-colors cursor-pointer"
              >
                Clear Cart
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
