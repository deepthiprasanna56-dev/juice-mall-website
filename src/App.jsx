import { lazy, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FlavorJourney from './components/FlavorJourney';
import Menu from './components/Menu';
import SpecialOffers from './components/SpecialOffers';
import JuiceLab from './components/JuiceLab';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductQuickViewModal from './components/ProductQuickViewModal';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';
import './App.css';

const Dashboard = lazy(() => import('./components/Dashboard'));
const MallExplorer = lazy(() => import('./components/MallExplorer'));

function MainApp() {
  return (
    <div
      className="min-h-screen w-full flex flex-col bg-[#fbfaf6] text-[#292923] transition-colors duration-300 dark:bg-[#07090e] dark:text-stone-200"
    >
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FlavorJourney />
        {/* ── 3D Mall Explorer & Product Showcase ── */}
        <Suspense fallback={<div className="min-h-72" aria-hidden="true" />}>
          <MallExplorer />
        </Suspense>
        <Menu />
        <SpecialOffers />
        <JuiceLab />
        <About />
        <Testimonials />
        <Suspense fallback={<div className="min-h-72" aria-hidden="true" />}>
          <Dashboard />
        </Suspense>
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
      <ProductQuickViewModal />
      <CheckoutModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </ThemeProvider>
  );
}
