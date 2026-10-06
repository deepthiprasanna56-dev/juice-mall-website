import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { Sun, Moon, ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home',      href: '#home' },
  { name: 'Flavors',   href: '#flavors' },
  { name: '3D Mall',   href: '#mall' },
  { name: 'Showcase',  href: '#showcase' },
  { name: 'Menu',      href: '#menu' },
  { name: 'Offers',    href: '#offers' },
  { name: 'Blend Lab', href: '#lab' },
  { name: 'Contact',   href: '#contact' },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { cartCount, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (href) => {
    setMobileOpen(false);
    setActiveLink(href);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'py-3 shadow-2xl shadow-black/40'
          : 'py-4'
      }`}
      style={scrolled ? {
        background: 'rgba(7, 9, 14, 0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(212,175,55,0.18)',
      } : {
        background: 'rgba(7, 9, 14, 0.5)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid transparent',
      }}
    >
      <div className="w-full max-w-none px-4 sm:px-7 lg:px-10 2xl:px-14">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); navigate('#home'); }}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #996515)', boxShadow: '0 0 20px rgba(212,175,55,0.4)' }}
            >
              <span className="text-lg font-black text-stone-900">J</span>
            </div>
            <div>
              <span
                className="font-black text-xl tracking-tight"
                style={{
                  fontFamily: "'Cinzel', serif",
                  background: 'linear-gradient(135deg, #FFF3BF 0%, #F59E0B 50%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                JUICE MALL
              </span>
              <p className="text-[10px] text-stone-500 tracking-widest uppercase -mt-0.5 hidden sm:block">
                The Grand Atrium
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); navigate(link.href); }}
                className="relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer text-stone-300 hover:text-white"
                style={activeLink === link.href ? { color: '#F59E0B' } : {}}
              >
                {link.name}
                {activeLink === link.href && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: '#D4AF37' }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2.5 rounded-full text-stone-400 hover:text-[#D4AF37] transition-all cursor-pointer hover:bg-white/10"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm text-stone-900 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #FFF3BF, #F59E0B, #D4AF37)',
                boxShadow: '0 4px 20px rgba(212,175,55,0.35)',
              }}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-stone-900 text-[#D4AF37] text-xs flex items-center justify-center font-extrabold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 rounded-xl text-stone-300 hover:bg-white/10 transition-colors cursor-pointer"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden px-5 py-6 border-t"
          style={{ background: 'rgba(7,9,14,0.97)', borderColor: 'rgba(212,175,55,0.15)' }}
        >
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); navigate(link.href); }}
                className="px-4 py-3 rounded-xl text-base font-semibold text-stone-200 hover:text-[#F59E0B] hover:bg-white/5 transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-sm font-medium text-stone-500">Appearance</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/8 text-sm font-semibold text-stone-200 cursor-pointer hover:bg-white/15 transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
