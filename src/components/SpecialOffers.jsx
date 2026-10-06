import { useState, useEffect } from 'react';
import { SPECIAL_COMBOS } from '../data/juiceData';
import { useCart } from '../context/CartContext';
import { Flame, Clock, Check, Copy, Tag, Gift, ShoppingBag } from 'lucide-react';

export default function SpecialOffers() {
  const { addToCart, applyCoupon, triggerConfetti, showToast } = useCart();
  const [copiedCode, setCopiedCode] = useState(null);

  // Live ticking countdown timer for Deal of the Day
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddCombo = (combo) => {
    addToCart({
      id: combo.id,
      name: combo.name,
      price: combo.price,
      originalPrice: combo.originalPrice,
      image: combo.image,
      size: 'Combo Bundle',
      category: 'Combo Pack',
      tagline: combo.description
    }, 1);
    triggerConfetti();
    showToast(`Claimed ${combo.name}! Added bundle to cart 🎁`);
  };

  const handleCopyCode = (code) => {
    try {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      applyCoupon(code);
      setTimeout(() => setCopiedCode(null), 2500);
    } catch {
      applyCoupon(code);
    }
  };

  return (
    <section id="offers" className="py-20 relative overflow-hidden bg-white dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-bold mb-3 uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>Limited Time Value Bundles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
            Special Combos & Flash Deals
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600 dark:text-stone-300">
            Stock up on wellness! Bundle your favorite raw juices, smoothies, and cleanses to save up to 35% with complimentary cold thermal packaging.
          </p>

          {/* Deal of the Day Live Countdown Widget */}
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-rose-500/10 border border-orange-200 dark:border-stone-800">
            <Clock className="w-5 h-5 text-orange-500" />
            <span className="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">
              Flash Deal Closes In:
            </span>
            <div className="flex items-center gap-1.5 font-mono text-sm sm:text-base font-black text-orange-600 dark:text-orange-400">
              <span className="bg-white dark:bg-stone-800 px-2 py-0.5 rounded-lg border border-orange-200 dark:border-stone-700 shadow-sm">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="bg-white dark:bg-stone-800 px-2 py-0.5 rounded-lg border border-orange-200 dark:border-stone-700 shadow-sm">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="bg-white dark:bg-stone-800 px-2 py-0.5 rounded-lg border border-orange-200 dark:border-stone-700 shadow-sm">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {SPECIAL_COMBOS.map((combo) => (
            <div
              key={combo.id}
              className="group relative bg-white dark:bg-stone-800/90 rounded-3xl overflow-hidden border border-orange-100 dark:border-stone-700/80 shadow-lg hover:shadow-2xl hover:shadow-orange-500/15 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image banner with overlay */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={combo.image}
                  alt={combo.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500 text-white shadow-lg">
                    {combo.badge}
                  </span>
                </div>

                {/* Savings tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                      {combo.tag}
                    </span>
                    <h3 className="text-xl font-black">{combo.name}</h3>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {combo.description}
                </p>

                {/* Included Items */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider block">
                    What's Inside:
                  </span>
                  {combo.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Bonus Perk Pill */}
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/60 flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                  <Gift className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{combo.perk}</span>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-4 border-t border-stone-100 dark:border-stone-700/80 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-stone-900 dark:text-white">
                        ${combo.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-stone-400 line-through">
                        ${combo.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      You save {combo.savings}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddCombo(combo)}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-lg shadow-orange-500/25 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Claim Deal</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Voucher Codes Showcase Bar */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-600 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-6 space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
                <Tag className="w-3.5 h-3.5" />
                <span>Instant Discount Vouchers</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Unlock 20% Off Your First Cold Press Order
              </h3>
              <p className="text-xs sm:text-sm text-orange-100 font-medium max-w-md mx-auto lg:mx-0">
                Click any coupon below to auto-apply it directly to your shopping cart. Free cold-chain delivery on orders over $35!
              </p>
            </div>

            <div className="lg:col-span-6 flex flex-wrap gap-3 justify-center lg:justify-end">
              {[
                { code: 'FRESHJUICE20', discount: '20% OFF', note: 'All Juices' },
                { code: 'SUMMERSIP', discount: '15% OFF', note: 'Summer Line' },
                { code: 'DETOXLOVE', discount: '10% OFF', note: 'Cleanse Packs' }
              ].map((voucher) => (
                <button
                  key={voucher.code}
                  onClick={() => handleCopyCode(voucher.code)}
                  className="group bg-white/10 hover:bg-white text-white hover:text-stone-900 border-2 border-dashed border-white/50 hover:border-white p-3 rounded-2xl transition-all duration-200 text-left cursor-pointer flex items-center gap-3 active:scale-95 shadow-md"
                >
                  <div className="border-r border-white/30 group-hover:border-stone-300 pr-3">
                    <span className="block text-[10px] font-bold uppercase opacity-80">
                      {voucher.note}
                    </span>
                    <span className="text-sm font-black font-mono">
                      {voucher.code}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-amber-200 group-hover:text-orange-600">
                      {voucher.discount}
                    </span>
                    {copiedCode === voucher.code ? (
                      <Check className="w-4 h-4 text-emerald-400 group-hover:text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                    )}
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
