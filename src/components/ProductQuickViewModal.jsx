import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Star, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function ProductQuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, triggerConfetti } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    triggerConfetti();
    setQuickViewProduct(null);
    setQuantity(1);
  };

  const totalPrice = (quickViewProduct.price * quantity).toFixed(2);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        className="relative bg-white dark:bg-stone-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close"
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left: Product Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 shadow-md">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            {quickViewProduct.badge && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-500 text-white shadow-md">
                {quickViewProduct.badge}
              </span>
            )}
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg text-xs font-bold bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-stone-200 backdrop-blur-sm">
              Cold-Pressed: {quickViewProduct.size}
            </div>
          </div>

          {/* Right: Details & Nutrition */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-1">
                <span>{quickViewProduct.category}</span>
                <span>•</span>
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="ml-1 text-stone-700 dark:text-stone-200">
                    {quickViewProduct.rating} ({quickViewProduct.reviewsCount} reviews)
                  </span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white leading-tight">
                {quickViewProduct.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                {quickViewProduct.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Nutrition Highlights Grid */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 dark:border-stone-800 text-center">
              <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/40">
                <span className="block text-xs text-stone-400 uppercase font-bold">Calories</span>
                <span className="text-sm font-extrabold text-stone-900 dark:text-white">
                  {quickViewProduct.calories} kcal
                </span>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40">
                <span className="block text-xs text-stone-400 uppercase font-bold">Fruit Sugar</span>
                <span className="text-sm font-extrabold text-stone-900 dark:text-white">
                  {quickViewProduct.sugar}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40">
                <span className="block text-xs text-stone-400 uppercase font-bold">Vitamin C</span>
                <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                  {quickViewProduct.vitC}
                </span>
              </div>
            </div>

            {/* Ingredients List */}
            <div>
              <span className="text-xs font-bold text-stone-900 dark:text-white block mb-1.5 uppercase tracking-wider">
                100% Raw Ingredients:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickViewProduct.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium"
                  >
                    {ing}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-stone-400 mt-2">
                Allergen Note: {quickViewProduct.allergens}
              </p>
            </div>

            {/* Quantity Selector and Total Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-xl p-1 bg-stone-50 dark:bg-stone-800">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 rounded-lg hover:bg-white dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 disabled:opacity-40 cursor-pointer"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-black text-sm text-stone-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 rounded-lg hover:bg-white dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart • ${totalPrice}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
