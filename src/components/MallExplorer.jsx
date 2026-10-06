import { lazy, Suspense, useState, useRef, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, ShoppingBag, Sparkles, Eye, RotateCcw, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { JUICE_PRODUCTS } from '../data/juiceData';
import { useCart } from '../context/CartContext';
import './MallExplorer.css';

const MallScene = lazy(() => import('./MallScene'));
const ProductShowcase3D = lazy(() => import('./ProductShowcase3D'));

/* ── Stall data matching the 3D scene ── */
const STALL_DATA = [
  { id: 'orange', name: 'Orange Citrus Glow', color: '#ff8c00', productId: 'juice-1', tagline: 'Valencia orange, ruby grapefruit & turmeric', emoji: '🍊' },
  { id: 'mango', name: 'Mango Sunrise', color: '#f5c518', productId: 'juice-4', tagline: 'Alphonso mango, passion fruit & pineapple', emoji: '🥭' },
  { id: 'pineapple', name: 'Pineapple Press', color: '#84cc16', productId: 'juice-13', tagline: 'Golden pineapple, young coconut & ginger', emoji: '🍍' },
  { id: 'watermelon', name: 'Watermelon Velvet', color: '#e11d48', productId: 'juice-5', tagline: 'Pink pitaya, watermelon & sweet lychee', emoji: '🍉' },
  { id: 'berry', name: 'Berry Blast', color: '#7c3aed', productId: 'juice-3', tagline: 'Wild blueberries, pomegranate & acai', emoji: '🫐' },
];

/* ── Animated counter ── */
function AnimatedValue({ value, suffix = '', inView }) {
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(value.replace(/[^\d]/g, ''));
    if (isNaN(num)) { setDisplay(value); return; }
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * num).toLocaleString());
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);
  return <>{display}{suffix}</>;
}

/* ── Loading Fallback ── */
function MallLoading() {
  return (
    <div className="mall-loading">
      <div className="mall-loading-spinner" />
      <span className="mall-loading-text">Entering The Grand Atrium...</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Mall Explorer — Main Component
   ═══════════════════════════════════════════════════════ */
export default function MallExplorer() {
  const { addToCart } = useCart();
  const [activeStall, setActiveStall] = useState(null);
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  const sectionRef = useRef(null);
  const showcaseRef = useRef(null);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

  /* Showcase scroll progress */
  const { scrollYProgress: showcaseProgress } = useScroll({
    target: showcaseRef,
    offset: ['start end', 'end start'],
  });
  const scrollP = useTransform(showcaseProgress, [0.2, 0.8], [0, 1]);

  /* Update showcase index from scroll */
  useEffect(() => {
    const unsub = scrollP.on('change', (v) => {
      const idx = Math.min(4, Math.floor(v * 5));
      setShowcaseIndex(idx);
    });
    return unsub;
  }, [scrollP]);

  /* Stall click handler */
  const handleStallClick = useCallback((stallId) => {
    const stall = STALL_DATA.find((s) => s.id === stallId);
    if (stall) {
      setActiveStall(stall);
      setTimeout(() => setActiveStall(null), 5000);
    }
  }, []);

  /* Add to cart from stall card */
  const addStallProduct = useCallback(() => {
    if (!activeStall) return;
    const product = JUICE_PRODUCTS.find((p) => p.id === activeStall.productId);
    if (product) {
      addToCart(product, 1);
      setActiveStall(null);
    }
  }, [activeStall, addToCart]);

  const activeProduct = JUICE_PRODUCTS.find(
    (p) => p.id === STALL_DATA[showcaseIndex]?.productId
  );

  return (
    <>
      {/* ════════════════════════════════════════════════
          SECTION 1: 3D Mall Explorer
          ════════════════════════════════════════════════ */}
      <section id="mall" className="mall-explorer" ref={sectionRef} aria-label="3D Mall Explorer">
        {/* Ambient glow orbs */}
        <div className="mall-glow-orb" style={{ top: '20%', left: '10%', width: 300, height: 300, background: '#ff8c00' }} aria-hidden="true" />
        <div className="mall-glow-orb" style={{ top: '40%', right: '5%', width: 250, height: 250, background: '#7c3aed', animationDelay: '2s' }} aria-hidden="true" />

        {/* Header */}
        <div className="mall-explorer-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="mall-explorer-badge">
              <Sparkles size={12} /> Interactive 3D Experience
            </span>
          </motion.div>
          <motion.h2
            className="mall-explorer-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Welcome to the <em>Grand Atrium</em>
          </motion.h2>
          <motion.p
            className="mall-explorer-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Explore our 3D juice mall. Drag to look around, click on any stall to discover its signature pour.
          </motion.p>
        </div>

        {/* 3D Mall Viewport */}
        <div className="mall-viewport">
          <Suspense fallback={<MallLoading />}>
            <MallScene onStallClick={handleStallClick} />
          </Suspense>

          {/* Stall Navigation Dots */}
          <div className="stall-nav">
            <span className="stall-nav-label">Stalls</span>
            {STALL_DATA.map((stall) => (
              <button
                key={stall.id}
                className={`stall-nav-dot ${activeStall?.id === stall.id ? 'active' : ''}`}
                style={{ '--dot-color': stall.color }}
                onClick={() => handleStallClick(stall.id)}
                aria-label={`View ${stall.name} stall`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="mall-controls">
            <button className="mall-control-btn" aria-label="Reset view" title="Reset camera">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Stall Info Card (appears on click) */}
        <div className={`stall-info-card ${activeStall ? 'visible' : ''}`}>
          {activeStall && (
            <>
              <div className="stall-info-swatch" style={{ background: activeStall.color }} />
              <div className="stall-info-text">
                <h4>{activeStall.emoji} {activeStall.name}</h4>
                <p>{activeStall.tagline}</p>
              </div>
              <span className="stall-info-price">
                ${JUICE_PRODUCTS.find((p) => p.id === activeStall.productId)?.price.toFixed(2)}
              </span>
              <button className="stall-info-button" onClick={addStallProduct}>
                <ShoppingBag size={13} /> Add to Bag
              </button>
            </>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 2: 3D Product Showcase Carousel
          ════════════════════════════════════════════════ */}
      <section id="showcase" className="showcase-section" ref={showcaseRef} aria-label="3D Product Showcase">
        {/* Header */}
        <div className="showcase-header">
          <motion.span
            className="mall-explorer-badge"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Eye size={12} /> 360° Product View
          </motion.span>
          <motion.h2
            className="mall-explorer-title"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}
          >
            The <em>Signature Collection</em>
          </motion.h2>
          <motion.p
            className="mall-explorer-subtitle"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Scroll to rotate through our premium cold-pressed selection.
          </motion.p>
        </div>

        {/* 3D Showcase */}
        <div className="showcase-viewport">
          <Suspense fallback={<MallLoading />}>
            <ProductShowcase3D
              activeIndex={showcaseIndex}
              scrollProgress={0}
              onProductClick={(idx) => setShowcaseIndex(idx)}
            />
          </Suspense>
        </div>

        {/* Product Info */}
        <div className="showcase-product-info">
          <motion.div
            key={showcaseIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="showcase-product-name">{activeProduct?.name || 'Sunburst Citrus'}</h3>
            <p className="showcase-product-tagline">{activeProduct?.tagline}</p>
            <div className="showcase-product-price">
              <strong>${activeProduct?.price.toFixed(2)}</strong>
              {activeProduct?.originalPrice && (
                <del>${activeProduct.originalPrice.toFixed(2)}</del>
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <button
                className="showcase-add-btn"
                onClick={() => activeProduct && addToCart(activeProduct, 1)}
              >
                <ShoppingBag size={14} /> Add to Bag
              </button>
              {/* Flavor Indicator Dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {STALL_DATA.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setShowcaseIndex(i)}
                    style={{
                      width: i === showcaseIndex ? 24 : 10,
                      height: 10,
                      borderRadius: 5,
                      border: 0,
                      background: i === showcaseIndex ? s.color : 'rgba(255,255,255,0.15)',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                    aria-label={`Select ${s.name}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div ref={statsRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px 60px',
        }}>
          {[
            { value: '100', suffix: '%', label: 'Cold-Pressed & Raw', sub: 'Zero heat, zero pasteurization' },
            { value: '50', suffix: '+', label: 'Exotic Recipes', sub: 'Created by certified nutritionists' },
            { value: '15000', suffix: '+', label: 'Happy Sippers', sub: 'Delivered fresh across the city' },
            { value: '49', suffix: '★', label: 'Average Rating', sub: 'From 3,200+ verified reviews' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 }}
              className="parallax-stat"
            >
              <span className="parallax-stat-value">
                <AnimatedValue value={stat.value} suffix={stat.suffix} inView={statsInView} />
              </span>
              <span className="parallax-stat-label">{stat.label}</span>
              <span className="parallax-stat-sub">{stat.sub}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
