import { useState, useMemo, lazy, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JUICE_PRODUCTS, CATEGORIES } from '../data/juiceData';
import { useCart } from '../context/CartContext';
import { Search, SlidersHorizontal, Sparkles, RefreshCw, Star, Eye, Plus, Check, Heart } from 'lucide-react';

const ThreeJuiceBottle = lazy(() => import('./ThreeJuiceBottle'));

/* ─── Preset map by category ─── */
const CATEGORY_PRESET = {
  'Citrus': 'orange', 'Tropical': 'mango', 'Berry': 'berry',
  'Green': 'pineapple', 'Wellness': 'pineapple', 'All Flavors': 'orange',
};

/* ─── 3D Menu Card ─── */
function JuiceCard3D({ product }) {
  const { addToCart, setQuickViewProduct } = useCart();
  const [isLiked, setIsLiked]     = useState(false);
  const [added, setAdded]         = useState(false);
  const [hovered, setHovered]     = useState(false);
  const cardRef = useRef(null);
  const [tilt, setTilt]           = useState({ x: 0, y: 0 });

  const preset = CATEGORY_PRESET[product.category] ?? 'orange';

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  /* Mouse-tilt 3D effect */
  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / (rect.height / 2)) * -10,
      y: ((e.clientX - cx) / (rect.width / 2)) * 10,
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      onClick={() => setQuickViewProduct(product)}
      className="relative cursor-pointer select-none rounded-3xl overflow-hidden group"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',
        border: '1px solid rgba(212,175,55,0.18)',
        backdropFilter: 'blur(12px)',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s' : 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        boxShadow: hovered ? '0 20px 60px -10px rgba(212,175,55,0.25), 0 0 0 1px rgba(212,175,55,0.3)' : '0 4px 24px -8px rgba(0,0,0,0.4)',
      }}
    >
      {/* Top 3D bottle section */}
      <div className="relative h-52 sm:h-56 bg-gradient-to-br from-[#0d0d12] to-[#1a1a24] overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: hovered ? 1.3 : 1, opacity: hovered ? 0.4 : 0.2 }}
            transition={{ duration: 0.4 }}
            className="w-32 h-32 rounded-full blur-2xl"
            style={{ background: hovered ? '#ff8c00' : '#D4AF37' }}
          />
        </div>

        {/* 3D Bottle — only visible on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <Suspense fallback={null}>
                <ThreeJuiceBottle preset={preset} />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Static product image (hidden on hover) */}
        <AnimatePresence>
          {!hovered && (
            <motion.img
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={product.image}
              alt={`${product.name} juice made with ${product.tagline.toLowerCase()}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          )}
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-transparent to-transparent opacity-60" />

        {/* Badges */}
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase" style={{ background: 'linear-gradient(135deg, #FFF3BF, #F59E0B)', color: '#0d0d12' }}>
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-rose-500 text-white">
            −{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label="Wishlist"
          onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer border ${isLiked ? 'bg-rose-500 border-rose-400 text-white' : 'bg-black/40 border-white/20 text-white/70 hover:text-rose-400'}`}
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View on hover */}
        <motion.button
          type="button"
          onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-x-4 bottom-3 py-2 rounded-xl bg-white/15 backdrop-blur-md text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-white/20 hover:bg-white/25 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" /> Quick View
        </motion.button>
      </div>

      {/* Card body */}
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        {/* Rating */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating}</span>
            <span className="text-stone-500 font-normal">({product.reviewsCount})</span>
          </div>
          <span className="text-stone-500 font-medium">{product.size}</span>
        </div>

        {/* Name */}
        <h3
          className="font-bold text-base sm:text-lg leading-tight text-white group-hover:text-[#F59E0B] transition-colors duration-300"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {product.name}
        </h3>

        {/* Tagline */}
        <p className="text-xs text-stone-400 line-clamp-2">{product.tagline}</p>

        {/* Ingredient pills */}
        <div className="flex flex-wrap gap-1.5">
          {product.ingredients.slice(0, 3).map((ing, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-md font-medium text-stone-300" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
              {ing}
            </span>
          ))}
          {product.ingredients.length > 3 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-md text-stone-500" style={{ background: 'rgba(255,255,255,0.05)' }}>+{product.ingredients.length - 3}</span>
          )}
        </div>

        {/* Price + Add to cart */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-1">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-white">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs text-stone-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">{product.calories} kcal · {product.vitC} Vit C</span>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition-all active:scale-90 cursor-pointer ${added ? 'bg-emerald-500 text-white' : ''}`}
            style={added ? {} : {
              background: 'linear-gradient(135deg, #FFF3BF, #F59E0B, #D4AF37)',
              color: '#0d0d12',
              boxShadow: '0 4px 16px rgba(212,175,55,0.3)',
            }}
          >
            {added ? <><Check className="w-4 h-4" /> Added!</> : <><Plus className="w-4 h-4" /> Add</>}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Menu Section ─── */
export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All Flavors');
  const [searchQuery, setSearchQuery]           = useState('');
  const [sortBy, setSortBy]                     = useState('featured');
  const [activeTag, setActiveTag]               = useState('all');

  const tags = ['all', 'Immunity', 'Detox', 'Superfood', 'Hydration'];

  const filtered = useMemo(() =>
    JUICE_PRODUCTS
      .filter((item) => {
        const catOk  = selectedCategory === 'All Flavors' || item.category === selectedCategory;
        const srchOk = item.name.toLowerCase().includes(searchQuery.toLowerCase())
          || item.tagline.toLowerCase().includes(searchQuery.toLowerCase())
          || item.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));
        const tagOk  = activeTag === 'all' || item.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase());
        return catOk && srchOk && tagOk;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc')  return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating')     return b.rating - a.rating;
        return 0;
      }),
    [selectedCategory, searchQuery, sortBy, activeTag]
  );

  const resetFilters = () => { setSelectedCategory('All Flavors'); setSearchQuery(''); setActiveTag('all'); setSortBy('featured'); };

  return (
    <section id="menu" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #07090E 0%, #0F1520 50%, #07090E 100%)' }}>
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-64 rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Farm to Bottle
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Our Collection
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-4 text-stone-400 text-base sm:text-lg">
            Handcrafted with organic fruits, cold-pressed daily. Hover a card to see it in 3D.
          </motion.p>
        </div>

        {/* ── Filters ── */}
        <div className="space-y-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start lg:justify-center">
            {CATEGORIES.map((cat) => {
              const sel = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer"
                  style={sel ? {
                    background: 'linear-gradient(135deg, #FFF3BF, #F59E0B, #D4AF37)',
                    color: '#0d0d12', boxShadow: '0 4px 16px rgba(212,175,55,0.35)',
                  } : {
                    background: 'rgba(255,255,255,0.06)',
                    color: '#a8a29e',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 sm:p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search flavor, ingredient..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white cursor-pointer">✕</button>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-1.5">
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTag(t)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer"
                    style={activeTag === t ? { background: 'rgba(212,175,55,0.2)', color: '#F59E0B' } : { color: '#78716c' }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/5 border border-white/10 text-stone-300 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results count + reset */}
        <div className="flex items-center justify-between mb-6 text-xs text-stone-500 font-medium px-1">
          <span>Showing <strong className="text-white font-bold">{filtered.length}</strong> cold-pressed recipes</span>
          {(searchQuery || selectedCategory !== 'All Flavors' || activeTag !== 'all') && (
            <button onClick={resetFilters} className="flex items-center gap-1 text-[#F59E0B] font-bold hover:underline cursor-pointer">
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          )}
        </div>

        {/* Cards grid */}
        {filtered.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <JuiceCard3D key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 rounded-3xl border border-dashed border-white/10">
            <span className="text-5xl mb-4 block">🍋</span>
            <h3 className="text-xl font-bold text-white mb-2">No juices match your search</h3>
            <p className="text-stone-500 text-sm mb-6">Try a different filter or reset.</p>
            <button onClick={resetFilters} className="px-6 py-2.5 rounded-full font-bold text-sm text-stone-900 cursor-pointer" style={{ background: 'linear-gradient(135deg, #FFF3BF, #F59E0B, #D4AF37)' }}>
              Show All Flavors
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
