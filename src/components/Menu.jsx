import { useState, useMemo } from 'react';
import { JUICE_PRODUCTS, CATEGORIES } from '../data/juiceData';
import ProductCard from './ProductCard';
import { Search, SlidersHorizontal, Sparkles, RefreshCw } from 'lucide-react';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All Flavors');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [activeTag, setActiveTag] = useState('all');

  const tags = ['all', 'Immunity', 'Detox', 'Superfood', 'Hydration'];

  const filteredProducts = useMemo(() => {
    return JUICE_PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All Flavors' || item.category === selectedCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag =
        activeTag === 'all' ||
        item.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase());

      return matchesCategory && matchesSearch && matchesTag;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy, activeTag]);

  return (
    <section id="menu" className="py-20 bg-stone-50/60 dark:bg-stone-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-3 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Farm to Bottle Goodness</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
            Our Fresh Juice Collection
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600 dark:text-stone-300">
            Handcrafted with organic fruits, leafy greens, roots, and superfoods. Never heated, never diluted, and delivered cold to preserve every active living enzyme.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 scale-105'
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-orange-300 hover:text-orange-500'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-stone-800 p-3 sm:p-4 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 shadow-sm">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search flavor, ingredient, or fruit..."
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Tag Pills & Sort */}
            <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
              
              {/* Quick Health Tags */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-stone-400 hidden xl:inline">Benefit:</span>
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTag(t)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                      activeTag === t
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold'
                        : 'text-stone-500 hover:text-stone-900 dark:text-stone-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

            </div>

          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-stone-500 dark:text-stone-400 font-medium px-1">
          <span>
            Showing <strong className="text-stone-900 dark:text-white font-bold">{filteredProducts.length}</strong> delicious cold-pressed recipes
          </span>
          {(searchQuery || selectedCategory !== 'All Flavors' || activeTag !== 'all') && (
            <button
              onClick={() => {
                setSelectedCategory('All Flavors');
                setSearchQuery('');
                setActiveTag('all');
                setSortBy('featured');
              }}
              className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-bold hover:underline cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Reset Filters
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-stone-800 rounded-3xl border border-dashed border-stone-300 dark:border-stone-700 p-8">
            <span className="text-5xl mb-4 block">🍋</span>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">
              No juices match your search
            </h3>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1 mb-6">
              Try searching for another fruit, ingredient, or reset your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All Flavors');
                setSearchQuery('');
                setActiveTag('all');
              }}
              className="px-6 py-2.5 rounded-full bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-colors cursor-pointer"
            >
              Show All Flavors
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
