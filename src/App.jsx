import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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

function MainApp() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#0F172A] text-stone-800 dark:text-stone-100 flex flex-col transition-colors duration-300">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero />
        <Menu />
        <SpecialOffers />
        <JuiceLab />
        <About />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
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
