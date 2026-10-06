import { ArrowRight, Sparkles, ShieldCheck, Zap, Droplets, Star, Clock, Flame } from 'lucide-react';
import { STATS } from '../data/juiceData';

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-orange-400/20 dark:bg-orange-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-emerald-400/20 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-amber-400/15 dark:bg-amber-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/90 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 text-xs sm:text-sm font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-orange-500 animate-spin" style={{ animationDuration: '8s' }} />
              <span>FRESH PRESS OF THE DAY • NEVER HEATED • ZERO PRESERVATIVES</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-stone-900 dark:text-white tracking-tight leading-[1.1]">
              Sip 100% Pure Nature.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500">
                Cold-Pressed
              </span>{' '}
              Delivered Chilled.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Experience revitalizing energy extracted with gentle hydraulic cold pressure. Packed with living enzymes, crisp botanicals, and vitamins from organic orchards directly to your glass.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300 bg-white/80 dark:bg-stone-800/80 px-3.5 py-1.5 rounded-full border border-stone-200 dark:border-stone-700 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Organic Orchards
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300 bg-white/80 dark:bg-stone-800/80 px-3.5 py-1.5 rounded-full border border-stone-200 dark:border-stone-700 shadow-sm">
                <Zap className="w-4 h-4 text-amber-500" /> 0% Added Sugars
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300 bg-white/80 dark:bg-stone-800/80 px-3.5 py-1.5 rounded-full border border-stone-200 dark:border-stone-700 shadow-sm">
                <Droplets className="w-4 h-4 text-sky-500" /> Cold-Chain 35°F Fresh
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => scrollTo('#menu')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('#offers')}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 font-bold text-base border border-stone-200 dark:border-stone-700 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Flame className="w-5 h-5 text-orange-500" />
                <span>Today's Combos & Offers</span>
              </button>

              <button
                onClick={() => scrollTo('#lab')}
                className="w-full sm:w-auto px-5 py-4 rounded-2xl text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Craft Custom Juice</span>
                <span className="text-xs bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full font-bold">Lab</span>
              </button>
            </div>

            {/* Social Proof Mini */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-stone-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Customer" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-stone-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Customer" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-stone-900 object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80" alt="Customer" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-stone-900 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" alt="Customer" />
              </div>
              <div className="text-left text-xs sm:text-sm">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1.5 font-bold text-stone-800 dark:text-stone-100">4.9 / 5</span>
                </div>
                <p className="text-stone-500 dark:text-stone-400 text-xs">Over 3,200+ five-star sips this month</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Bottle Showcase with Dynamic Float Badges */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Center glowing radiant backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-400/30 to-amber-300/30 dark:from-orange-500/20 dark:to-emerald-500/20 rounded-full blur-2xl transform scale-90 -z-10" />

            {/* Central Bottle Container */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-3xl p-6 flex items-center justify-center">
              
              {/* Product Hero Image */}
              <div className="relative group">
                <img
                  src="https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80"
                  alt="Juice Mall Fresh Citrus Cold-Pressed Juice"
                  className="w-72 sm:w-80 h-96 sm:h-[420px] object-cover rounded-3xl shadow-2xl shadow-orange-500/20 transform group-hover:scale-105 transition-transform duration-500 ring-4 ring-orange-500/20"
                />

                {/* Overlaid Glow Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-orange-100 dark:border-stone-800 flex items-center justify-between">
                  <div>
                    <h2 className="font-extrabold text-sm text-stone-900 dark:text-white">
                      Sunburst Citrus Glow
                    </h2>
                    <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold">
                      Valencia Orange • Grapefruit • Turmeric
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400 line-through mr-1">$7.99</span>
                    <span className="text-base font-black text-emerald-600 dark:text-emerald-400">$6.49</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: 30-Min Fast Chilled Delivery */}
              <div className="absolute -top-4 -left-4 sm:left-0 bg-white/95 dark:bg-stone-800/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-stone-100 dark:border-stone-700 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase text-stone-400">Express Delivery</span>
                  <span className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-white">&lt; 30 Mins Chilled</span>
                </div>
              </div>

              {/* Floating Badge 2: Daily Cold Pressing */}
              <div className="absolute -bottom-6 -right-2 sm:right-2 bg-white/95 dark:bg-stone-800/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-stone-100 dark:border-stone-700 flex items-center gap-3 animate-float-delayed">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase text-stone-400">Hydraulic Pressed</span>
                  <span className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-white">Preserves 100% Enzymes</span>
                </div>
              </div>

              {/* Floating Badge 3: Discount voucher alert */}
              <div className="absolute top-1/2 -right-8 hidden xl:flex bg-gradient-to-r from-amber-500 to-orange-500 text-white p-2.5 rounded-2xl shadow-lg items-center gap-2 animate-bounce text-xs font-black">
                <span>🔥 CODE: FRESHJUICE20 (20% OFF)</span>
              </div>

            </div>
          </div>

        </div>

        {/* Quick Stats Banner below Hero */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-orange-100/80 dark:border-stone-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/60 dark:bg-stone-800/40 border border-orange-50 dark:border-stone-800 backdrop-blur-sm hover:scale-105 transition-transform duration-200"
              >
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 font-['Outfit']">
                  {stat.value}
                </div>
                <div className="font-bold text-stone-800 dark:text-stone-200 text-sm sm:text-base mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
