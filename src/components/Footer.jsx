import { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  ArrowUp,
  Mail,
  Send,
  Check,
  Heart,
  Sparkles
} from 'lucide-react';

export default function Footer() {
  const { showToast, triggerConfetti } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSubscribed(true);
    triggerConfetti();
    showToast('Subscribed! Check your inbox for your 15% promo code 💌');
    setNewsletterEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 relative overflow-hidden border-t border-stone-800">
      
      {/* Decorative top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-orange-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Newsletter Callout Banner */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600 rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join The Sipper Club</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                Get 15% Off Your Next Cold-Pressed Order
              </h3>
              <p className="text-xs sm:text-sm text-orange-100 font-medium max-w-lg mx-auto lg:mx-0">
                Receive weekly seasonal menu drops, exclusive detox guides from certified nutritionists, and flash member-only combos.
              </p>
            </div>

            <div className="lg:col-span-5">
              {isSubscribed ? (
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl flex items-center gap-3 text-sm font-bold">
                  <div className="w-8 h-8 rounded-full bg-emerald-400 text-stone-900 flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <span>You're in! Use promo code <strong>SUMMERSIP</strong> at checkout!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 rounded-2xl text-xs sm:text-sm bg-white text-stone-900 placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-950 text-white font-black text-xs sm:text-sm shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-emerald-400 flex items-center justify-center text-xl shadow-lg shadow-orange-500/20">
                🍊
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white font-['Outfit']">
                JUICE<span className="text-orange-500">MALL</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Crafting 100% raw, certified organic cold-pressed juices and smoothies. Extracted fresh each dawn under cold hydraulic pressure with zero preservatives or added sugars.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-orange-500 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-orange-500 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X / Twitter"
                className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-orange-500 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-orange-500 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('#home')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#menu')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Full Juice Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#offers')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Combos & Deals
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#lab')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Custom Blend Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#about')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  About Our Orchards
                </button>
              </li>
            </ul>
          </div>

          {/* Menu Categories */}
          <div>
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('#menu')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Citrus Boosters
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#menu')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Detox & Cleanse
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#menu')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Superfood Smoothies
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#menu')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Fiery Wellness Shots
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#offers')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Cleanse Programs
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  FAQ & Help Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Chilled Delivery Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Bottle Return Program
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Catering & Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Contact Our Team
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Juice Mall Inc. 100% Organic & Cold-Pressed. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-stone-400">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> & Fresh Fruits
            </span>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              aria-label="Back to Top"
              className="p-2.5 rounded-full bg-stone-800 hover:bg-orange-500 text-stone-300 hover:text-white transition-all duration-200 cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
