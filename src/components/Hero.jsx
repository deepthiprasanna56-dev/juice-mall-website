import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Clock3, MapPin, Sparkles, Star } from 'lucide-react';

const ThreeJuiceBottle = lazy(() => import('./ThreeJuiceBottle'));

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } },
};

export default function Hero() {
  const [show3D, setShow3D] = useState(false);
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    const timer = window.setTimeout(() => setShow3D(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="atrium-hero relative overflow-hidden">
      <div className="atrium-grain" aria-hidden="true" />
      <motion.div
        className="atrium-hero-inner"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        <div className="atrium-copy">
          <motion.div variants={reveal} className="atrium-eyebrow">
            <Sparkles size={14} strokeWidth={1.5} />
            <span>THE ART OF THE DAILY POUR</span>
          </motion.div>
          <motion.p variants={reveal} className="atrium-kicker">A brighter kind of ritual</motion.p>
          <motion.h1 variants={reveal}>
            Good things<br />
            <em>grow</em> slowly.
          </motion.h1>
          <motion.p variants={reveal} className="atrium-description">
            Orchard-picked fruit, pressed to order. Nothing to hide, nothing to add. Just a little more life in every sip.
          </motion.p>
          <motion.div variants={reveal} className="atrium-actions">
            <button className="atrium-button" onClick={() => scrollTo('#menu')}>
              Discover the menu <ArrowRight size={15} />
            </button>
            <button className="atrium-text-link" onClick={() => scrollTo('#about')}>
              Our approach <ArrowDown size={14} />
            </button>
          </motion.div>
          <motion.div variants={reveal} className="atrium-proof">
            <span className="atrium-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} />)}</span>
            <span><strong>4.9/5</strong> · Loved by 3,200+ guests</span>
          </motion.div>
        </div>

        <motion.div variants={reveal} className="atrium-scene" aria-label="Our signature sun-kissed citrus juice">
          <div className="atrium-sunlight" />
          <div className="atrium-arch arch-back" />
          <div className="atrium-arch arch-front" />
          <div className="atrium-orb orb-one" />
          <div className="atrium-orb orb-two" />
          <div className="scene-note">
            <span className="note-icon"><Sparkles size={16} /></span>
            <span><b>Pressed to order</b><small>Nothing added. Just fruit.</small></span>
          </div>
          <div className={`atrium-product${show3D ? ' atrium-product-3d' : ''}`} aria-hidden="true">
            {show3D ? (
              <Suspense fallback={<SignatureGlass />}>
                <div className="atrium-product-scene">
                  <ThreeJuiceBottle preset="orange" featured fruits />
                </div>
              </Suspense>
            ) : <SignatureGlass />}
          </div>
          <div className="scene-caption"><i /> OUR SIGNATURE POUR <i /></div>
        </motion.div>
      </motion.div>

      <div className="atrium-footline">
        <span><MapPin size={13} /> THE GRAND ATRIUM · LEVEL ONE</span>
        <span><Clock3 size={13} /> OPEN DAILY · 7AM–10PM</span>
        <span>GOOD FRUIT. GOOD MOOD.</span>
      </div>
    </section>
  );
}

function SignatureGlass() {
  return (
    <>
      <div className="juice-glass">
        <div className="juice-liquid" />
        <div className="juice-rim" />
        <div className="juice-straw" />
        <div className="juice-citrus">✳</div>
        <div className="juice-shadow" />
      </div>
      <div className="juice-plinth"><span>SUN-KISSED CITRUS</span><small>ORANGE · MANDARIN · LIME</small></div>
    </>
  );
}
