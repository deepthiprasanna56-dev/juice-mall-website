import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { SPECIAL_COMBOS, PROMO_CODES } from '../data/juiceData';

const COMBOS = SPECIAL_COMBOS;
const PROMO_LIST = Object.entries(PROMO_CODES).map(([code, val]) => ({
  code,
  description: val.desc,
  discount: val.discountPercent,
}));
import { useCart } from '../context/CartContext';
import { Clock, Tag, Zap, ChevronRight } from 'lucide-react';

const ThreeJuiceBottle = lazy(() => import('./ThreeJuiceBottle'));

/* ─── Countdown timer ─── */
function useCountdown(targetHours = 18) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const target = new Date();
    target.setHours(targetHours, 0, 0, 0);
    if (target <= new Date()) target.setDate(target.getDate() + 1);
    const tick = () => {
      const diff = Math.max(0, target - new Date());
      setTime({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetHours]);
  return time;
}

function Digit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="text-4xl sm:text-5xl font-black tabular-nums"
        style={{
          fontFamily: "'Cinzel', serif",
          background: 'linear-gradient(135deg, #FFF3BF, #F59E0B, #D4AF37)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] font-bold tracking-widest uppercase text-stone-500 mt-1">{label}</span>
    </div>
  );
}

const PRESET_MAP = { 'combo-1': 'orange', 'combo-2': 'pineapple', 'combo-3': 'berry' };

export default function SpecialOffers() {
  const { addToCart } = useCart();
  const timer = useCountdown(20);
  const [copiedCode, setCopiedCode] = useState(null);
  const [hovered3D, setHovered3D]   = useState(null);

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="offers" className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0F0800 0%, #07090E 40%, #0a0d12 100%)' }}>
      {/* Ambient lights */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] max-w-[700px] rounded-full blur-[140px] opacity-[0.08]" style={{ background: '#ff8c00' }} />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] max-w-[500px] rounded-full blur-[100px] opacity-[0.06]" style={{ background: '#D4AF37' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header + countdown */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-5"
          >
            <Zap size={12} /> Today Only · Flash Deals
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Special Offers
          </motion.h2>
          <p className="text-stone-400 text-base sm:text-lg mb-10">Limited time combos at exclusive prices. Ends at midnight.</p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-4 sm:gap-6 px-8 py-5 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.25)' }}
          >
            <Clock size={20} className="text-[#D4AF37]" />
            <Digit value={timer.h} label="Hours" />
            <span className="text-2xl font-black text-[#D4AF37] -mt-3">:</span>
            <Digit value={timer.m} label="Mins" />
            <span className="text-2xl font-black text-[#D4AF37] -mt-3">:</span>
            <Digit value={timer.s} label="Secs" />
          </motion.div>
        </div>

        {/* Combo cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {COMBOS.map((combo, index) => {
            const savings = combo.originalPrice - combo.price;
            const savePct = Math.round((savings / combo.originalPrice) * 100);
            const preset  = PRESET_MAP[combo.id] ?? 'orange';

            return (
              <motion.div
                key={combo.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHovered3D(combo.id)}
                onMouseLeave={() => setHovered3D(null)}
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  boxShadow: hovered3D === combo.id ? '0 20px 60px -10px rgba(212,175,55,0.25)' : 'none',
                  transition: 'box-shadow 0.3s',
                }}
              >
                {/* 3D preview zone */}
                <div className="relative h-52 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0d0d18 0%, #1a1a24 100%)' }}>
                  {/* Glow */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: hovered3D === combo.id ? 1.4 : 1, opacity: hovered3D === combo.id ? 0.4 : 0.2 }}
                      transition={{ duration: 0.4 }}
                      className="w-28 h-28 rounded-full blur-2xl"
                      style={{ background: '#D4AF37' }}
                    />
                  </div>
                  <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-4xl">🥤</div>}>
                    <ThreeJuiceBottle preset={preset} />
                  </Suspense>
                  {/* Save badge */}
                  <div
                    className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-black"
                    style={{ background: 'linear-gradient(135deg, #f43f5e, #be123c)', color: '#fff' }}
                  >
                    SAVE {savePct}%
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-black text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{combo.name}</h3>
                  <p className="text-stone-400 text-sm mb-4">{combo.description}</p>

                  {/* Items list */}
                  <ul className="space-y-1 mb-4">
                    {combo.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-stone-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Price row */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white">${combo.price.toFixed(2)}</span>
                        <span className="text-sm text-stone-500 line-through">${combo.originalPrice.toFixed(2)}</span>
                      </div>
                      <span className="text-xs text-emerald-400 font-semibold">Save ${savings.toFixed(2)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        combo.items.forEach(() => {
                          /* addToCart logic for combos */
                        });
                      }}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold cursor-pointer transition-all hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, #FFF3BF, #F59E0B, #D4AF37)', color: '#0d0d12', boxShadow: '0 4px 16px rgba(212,175,55,0.3)' }}
                    >
                      Add Combo <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Promo codes */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-6 sm:p-8"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.2)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Tag size={18} className="text-[#D4AF37]" />
            <div>
              <h3 className="text-lg font-black text-white" style={{ fontFamily: "'Cinzel', serif" }}>Promo Codes</h3>
              <p className="text-stone-400 text-sm">Copy a code and apply at checkout</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROMO_LIST.map((promo) => (
              <button
                key={promo.code}
                type="button"
                onClick={() => copyCode(promo.code)}
                className="group flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer text-left"
                style={{
                  background: copiedCode === promo.code ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)',
                  borderColor: copiedCode === promo.code ? 'rgba(16,185,129,0.4)' : 'rgba(212,175,55,0.2)',
                }}
              >
                <div>
                  <span
                    className="text-base font-black block mb-0.5"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      background: 'linear-gradient(135deg, #FFF3BF, #F59E0B)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {promo.code}
                  </span>
                  <span className="text-xs text-stone-400">{promo.description}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-lg font-black text-white">{promo.discount}% off</span>
                  <span className="text-[10px] text-stone-500 font-bold tracking-widest uppercase">
                    {copiedCode === promo.code ? '✓ Copied!' : 'Click to copy'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
