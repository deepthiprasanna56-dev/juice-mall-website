import { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Clock,
  PackageCheck
} from 'lucide-react';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    subtotal,
    discountAmount,
    deliveryFee,
    total,
    appliedCoupon,
    clearCart,
    triggerConfetti
  } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    name: 'Taylor Swift',
    address: '742 Evergreen Terrace, Apt 4B',
    city: 'San Francisco, CA 94103',
    phone: '+1 (555) 432-8765',
    slot: 'Morning (8:00 AM - 10:00 AM)',
    paymentMethod: 'card'
  });

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newOrderId = `JM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    setOrderPlaced(true);
    triggerConfetti();
    setTimeout(() => {
      triggerConfetti();
    }, 400);
  };

  const handleCloseAndFinish = () => {
    clearCart();
    setOrderPlaced(false);
    setIsCheckoutOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-sm"
      onClick={() => setIsCheckoutOpen(false)}
    >
      <div
        className="relative bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsCheckoutOpen(false)}
          aria-label="Close"
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {orderPlaced ? (
          /* Order Confirmation Receipt Screen */
          <div className="text-center py-6 space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-500 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-wider text-orange-500">
                Order Confirmed
              </span>
              <h2 className="text-3xl font-black text-stone-900 dark:text-white mt-1">
                Your Juices Are Being Freshly Pressed!
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 max-w-md mx-auto">
                Thank you for your order, <strong>{formData.name}</strong>. Our cold-press team has begun packing your bottles into insulated cold-chain thermal bags.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-stone-50 dark:bg-stone-800/80 rounded-2xl p-5 border border-stone-200 dark:border-stone-700 text-left space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-stone-200 dark:border-stone-700">
                <span className="text-xs font-bold text-stone-400">Order ID:</span>
                <span className="font-mono font-bold text-sm text-stone-900 dark:text-white">{orderId}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500">Delivery Window:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{formData.slot}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500">Delivering To:</span>
                <span className="font-bold text-stone-800 dark:text-stone-200 text-right truncate max-w-[200px]">
                  {formData.address}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500">Items Ordered:</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} bottles
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-stone-200 dark:border-stone-700 text-sm font-black">
                <span>Total Paid:</span>
                <span className="text-orange-600 dark:text-orange-400 text-base">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCloseAndFinish}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 cursor-pointer"
            >
              Done & Return to Juice Mall
            </button>
          </div>
        ) : (
          /* Checkout Input Form */
          <div>
            <div className="mb-6">
              <span className="text-xs font-black uppercase tracking-wider text-orange-500">
                Cold-Chain Express Delivery
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white mt-0.5">
                Checkout & Delivery Details
              </h2>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-5">
              {/* Recipient Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  1. Delivery Address
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Recipient Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Street Address & Apt *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      City, Zip *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Window Picker */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  2. Chilled Delivery Window
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    'Morning (8:00 AM - 10:00 AM)',
                    'Afternoon (1:00 PM - 3:00 PM)',
                    'Evening (6:00 PM - 8:00 PM)'
                  ].map((slot) => {
                    const isSelected = formData.slot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, slot })}
                        className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-stone-900 dark:text-white font-bold'
                            : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5 mb-1 text-orange-500" />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  3. Payment Method
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'card', name: 'Credit Card', icon: CreditCard },
                    { id: 'apple', name: 'Apple / Google Pay', icon: ShieldCheck },
                    { id: 'cod', name: 'Cash on Delivery', icon: Truck }
                  ].map((method) => {
                    const isSelected = formData.paymentMethod === method.id;
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-stone-900 dark:text-white font-bold'
                            : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                        }`}
                      >
                        <Icon className="w-4 h-4 mb-1 text-orange-500" />
                        <span className="text-xs">{method.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Order Final Summary */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600 dark:text-stone-300">
                  <span>Subtotal ({cartItems.length} items):</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>Coupon ({appliedCoupon.code}):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600 dark:text-stone-300">
                  <span>Chilled Shipping:</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 dark:border-stone-700 text-sm font-black text-stone-900 dark:text-white">
                  <span>Total Amount:</span>
                  <span className="text-orange-600 dark:text-orange-400 text-lg">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 text-white font-extrabold text-sm shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
              >
                <PackageCheck className="w-5 h-5" />
                <span>Place Chilled Order • ${total.toFixed(2)}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
