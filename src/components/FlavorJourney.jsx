import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowRight, ShoppingBag } from 'lucide-react';
import { JUICE_PRODUCTS } from '../data/juiceData';
import { useCart } from '../context/CartContext';

const ThreeJuiceBottle = lazy(() => import('./ThreeJuiceBottle'));

const WORLDS = [
  {
    id: 'flavor-orange', name: 'Orange', title: 'A little sunshine,\npressed.',
    note: 'Valencia orange · blood orange · Meyer lemon',
    productId: 'juice-1', preset: 'orange',
    bg: 'from-[#1a0a00] via-[#2d1400] to-[#0a0500]',
    accent: '#ff8c00', text: '#fed7aa',
    orb1: '#ff6a00', orb2: '#d4af37',
  },
  {
    id: 'flavor-mango', name: 'Mango', title: 'Summer, in its\ngolden hour.',
    note: 'Alphonso mango · passionfruit · lime',
    productId: 'juice-4', preset: 'mango',
    bg: 'from-[#1a1200] via-[#2d2000] to-[#0a0900]',
    accent: '#f5c518', text: '#fef08a',
    orb1: '#e5a10a', orb2: '#a16207',
  },
  {
    id: 'flavor-watermelon', name: 'Watermelon', title: 'A cooler kind of\nrefreshment.',
    note: 'Watermelon · rose · pink lime',
    productId: 'juice-5', preset: 'watermelon',
    bg: 'from-[#1a0010] via-[#2d0020] to-[#0a0008]',
    accent: '#e11d48', text: '#fecdd3',
    orb1: '#be123c', orb2: '#9f1239',
  },
  {
    id: 'flavor-berry', name: 'Berry', title: 'A darker, deeper\norchard.',
    note: 'Blueberry · blackberry · pomegranate',
    productId: 'juice-3', preset: 'berry',
    bg: 'from-[#0d0020] via-[#1a0035] to-[#050010]',
    accent: '#7c3aed', text: '#ddd6fe',
    orb1: '#6d28d9', orb2: '#4c1d95',
  },
  {
    id: 'flavor-pineapple', name: 'Pineapple', title: 'An island state\nof mind.',
    note: 'Golden pineapple · young coconut · ginger',
    productId: 'juice-13', preset: 'pineapple',
    bg: 'from-[#0d1a00] via-[#1a2d00] to-[#050a00]',
    accent: '#84cc16', text: '#d9f99d',
    orb1: '#65a30d', orb2: '#3f6212',
  },
];

export default function FlavorJourney() {
  const sectionRef  = useRef(null);
  const [visible, setVisible] = useState(new Set());
  const { addToCart } = useCart();

  useEffect(() => {
    const panels = sectionRef.current?.querySelectorAll('[data-flavor-index]');
    if (!panels) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const idx = Number(entry.target.dataset.flavorIndex);
        if (entry.isIntersecting) {
          setVisible(new Set([idx]));
          window.dispatchEvent(new CustomEvent('juice-flavor-change', { detail: WORLDS[idx].id }));
        } else setVisible((current) => current.has(idx) ? new Set() : current);
      });
    }, { threshold: 0.5 });
    panels.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, []);

  const addFlavor = (productId) => {
    const product = JUICE_PRODUCTS.find((p) => p.id === productId);
    if (product) addToCart(product, 1);
  };


  return (
    <section
      id="flavors"
      ref={sectionRef}
      className="relative"
      aria-label="Flavor worlds journey"
    >
      {/* Intro heading panel */}
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#07090E] to-[#0d1a0a] py-24 px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-6"
        >
          The Orchard Collection · 01—05
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black text-white leading-tight mb-4"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Five Worlds.<br />
          <em className="not-italic" style={{ background: 'linear-gradient(135deg, #FFF3BF, #F59E0B, #D4AF37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            One Perfect Pour.
          </em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-stone-400 max-w-lg text-base sm:text-lg mb-8"
        >
          Scroll through the orchard. Each flavor world transforms the entire environment around it.
        </motion.p>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-stone-500">
          <ArrowDown size={20} />
        </motion.div>
      </div>

      {/* Flavor World Panels */}
      {WORLDS.map((flavor, index) => {
        const product = JUICE_PRODUCTS.find((p) => p.id === flavor.productId);
        const isVisible = visible.has(index);
        return (
          <div
            key={flavor.id}
            data-flavor-index={index}
            className={`relative min-h-screen flex items-center bg-gradient-to-br ${flavor.bg} overflow-hidden`}
          >
            {/* Ambient glow orbs */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute top-1/4 left-0 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full blur-[120px] opacity-15" style={{ background: flavor.orb1 }} />
              <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] opacity-12" style={{ background: flavor.orb2 }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 w-full grid lg:grid-cols-2 gap-12 items-center py-24">
              {/* Copy */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6 order-2 lg:order-1"
              >
                <div className="flex items-center gap-3 text-xs font-bold tracking-widest" style={{ color: flavor.accent }}>
                  <span className="w-8 h-px" style={{ background: flavor.accent }} />
                  <span>0{index + 1} / THE ORCHARD COLLECTION</span>
                </div>
                <h3
                  className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight whitespace-pre-line"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: flavor.text,
                  }}
                >
                  {flavor.title}
                </h3>
                <p className="text-stone-400 text-base sm:text-lg max-w-md">{flavor.note}</p>
                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => addFlavor(flavor.productId)}
                    className="group flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-sm text-stone-900 cursor-pointer transition-all hover:scale-105 hover:shadow-xl"
                    style={{ background: `linear-gradient(135deg, ${flavor.accent}, ${flavor.orb2})`, boxShadow: `0 8px 24px ${flavor.accent}40` }}
                  >
                    <ShoppingBag size={15} />
                    Add to bag · ${product?.price.toFixed(2)}
                  </button>
                  <span className="text-xs text-stone-500 font-semibold tracking-wider uppercase">450 ml · Never heated</span>
                </div>
                {/* Prev / Next navigation */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  {WORLDS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        document.querySelector(`[data-flavor-index="${i}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="w-2 h-2 rounded-full transition-all cursor-pointer"
                      style={{ background: i === index ? flavor.accent : 'rgba(255,255,255,0.2)', transform: i === index ? 'scale(1.5)' : 'scale(1)' }}
                      aria-label={`Go to ${WORLDS[i].name}`}
                    />
                  ))}
                  <a
                    href="#flavors"
                    onClick={(e) => {
                      e.preventDefault();
                      const next = (index + 1) % WORLDS.length;
                      document.querySelector(`[data-flavor-index="${next}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="ml-auto flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase transition-all hover:gap-2.5"
                    style={{ color: flavor.accent }}
                  >
                    {index === WORLDS.length - 1 ? 'Back to Orange' : `Next: ${WORLDS[index + 1].name}`}
                    <ArrowRight size={12} />
                  </a>
                </div>
              </motion.div>

              {/* 3D Bottle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="relative flex items-center justify-center order-1 lg:order-2"
              >
                {/* Glow behind */}
                <div
                  className="absolute w-64 h-64 rounded-full blur-3xl opacity-30"
                  style={{ background: `radial-gradient(circle, ${flavor.accent} 0%, transparent 70%)` }}
                />
                {/* Orbit */}
                <div
                  className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border animate-spin"
                  style={{ borderColor: `${flavor.accent}25`, animationDuration: '15s' }}
                />
                {/* R3F Canvas */}
                <div className="w-64 h-80 sm:w-80 sm:h-[420px] lg:w-96 lg:h-[500px]">
                  <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-4xl animate-pulse">🍹</div>}>
                    <ThreeJuiceBottle preset={flavor.preset} />
                  </Suspense>
                </div>
                {/* Label */}
                <div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border backdrop-blur-md whitespace-nowrap"
                  style={{ borderColor: `${flavor.accent}40`, background: `${flavor.accent}15`, color: flavor.text }}
                >
                  {flavor.name} · Cold Pressed Daily
                </div>
              </motion.div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
