import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Star, Eye, Plus, Check, Heart } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, setQuickViewProduct } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [addedRecently, setAddedRecently] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 1600);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group relative bg-white dark:bg-stone-800/90 rounded-3xl p-4 sm:p-5 border border-orange-100/80 dark:border-stone-700/60 shadow-md hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Card Image & Floating Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-900 mb-4">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30">
            {product.badge}
          </span>
        )}

        {/* Discount Badge */}
        {discountPercent && (
          <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-lg text-[11px] font-extrabold bg-rose-500 text-white shadow-sm">
            Save {discountPercent}%
          </span>
        )}

        {/* Top-Right Favorite / Wishlist Button */}
        <button
          type="button"
          aria-label="Wishlist"
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            isLiked
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/80 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:text-rose-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
        </button>

        {/* Center Quick View button on hover */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="absolute inset-x-8 bottom-4 py-2 rounded-xl bg-white/95 dark:bg-stone-900/95 text-stone-900 dark:text-white text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-orange-500 hover:text-white cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick Nutrition Info</span>
        </button>
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Size */}
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1.5">
            <div className="flex items-center text-amber-500 font-bold gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-stone-400 text-[11px]">({product.reviewsCount})</span>
            </div>
            <span className="font-semibold text-stone-400">{product.size}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-white leading-tight group-hover:text-orange-500 transition-colors">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Ingredient Pills */}
          <div className="flex flex-wrap gap-1.5 my-3">
            {product.ingredients.slice(0, 3).map((ing, i) => (
              <span
                key={i}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-700/60 text-stone-600 dark:text-stone-300"
              >
                {ing}
              </span>
            ))}
            {product.ingredients.length > 3 && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-700/60 text-stone-400">
                +{product.ingredients.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Nutrition and Price Bar */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-700/60 flex items-center justify-between mt-1">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-black text-stone-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 block -mt-0.5">
              {product.calories} kcal • {product.vitC} Vit C
            </span>
          </div>

          {/* Add to Cart button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`p-2.5 sm:px-3 sm:py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-90 cursor-pointer ${
              addedRecently
                ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25 hover:shadow-orange-500/40'
            }`}
            title="Add to Cart"
          >
            {addedRecently ? (
              <>
                <Check className="w-4 h-4 animate-scale" />
                <span className="hidden sm:inline">Added!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
