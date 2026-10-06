import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FAQS } from '../data/juiceData';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

export default function Contact() {
  const { showToast, triggerConfetti } = useCart();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'General Inquiry',
    message: ''
  });

  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }
    setFormSubmitted(true);
    triggerConfetti();
    showToast('Your message has been sent to our juice masters! 🍹');
    setFormData({
      name: '',
      email: '',
      phone: '',
      topic: 'General Inquiry',
      message: ''
    });
    setTimeout(() => setFormSubmitted(false), 8000);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 text-xs font-bold mb-3 uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>We're Here For You</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
            Get in Touch & Visit Us
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600 dark:text-stone-300">
            Have questions about a cleanse program, custom corporate catering, or nutritional allergen profiles? Our team of juicing experts is ready to help.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-stone-50 dark:bg-stone-800/80 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-700/80 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Juice Mall Bar</span>
              <h4 className="font-extrabold text-stone-900 dark:text-white text-sm sm:text-base mt-0.5">
                424 Orchard Avenue
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Level 1, The Grand Atrium, San Francisco, CA
              </p>
            </div>
          </div>

          <div className="bg-stone-50 dark:bg-stone-800/80 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-700/80 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Opening Hours</span>
              <h4 className="font-extrabold text-stone-900 dark:text-white text-sm sm:text-base mt-0.5">
                Mon - Sun: 7am - 9pm
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Cold-pressing begins every morning at 5:00 AM
              </p>
            </div>
          </div>

          <div className="bg-stone-50 dark:bg-stone-800/80 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-700/80 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Call Our Bar</span>
              <h4 className="font-extrabold text-stone-900 dark:text-white text-sm sm:text-base mt-0.5">
                +1 (800) 584-2362
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Toll-free 7 days a week, 8am-8pm
              </p>
            </div>
          </div>

          <div className="bg-stone-50 dark:bg-stone-800/80 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-700/80 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Email Support</span>
              <h4 className="font-extrabold text-stone-900 dark:text-white text-sm sm:text-base mt-0.5">
                hello@juicemall.com
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Average reply time &lt; 2 hours
              </p>
            </div>
          </div>
        </div>

        {/* Form and FAQ 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-6 bg-stone-50 dark:bg-stone-800/90 rounded-3xl p-6 sm:p-10 border border-stone-200/80 dark:border-stone-700/80 shadow-lg">
            <h3 className="text-2xl font-black text-stone-900 dark:text-white mb-2">
              Send Us a Message
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-6">
              Fill out the form below and our certified in-house juice specialist will respond shortly.
            </p>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-extrabold text-lg text-emerald-900 dark:text-emerald-100">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
                  Thank you for reaching out. We have received your inquiry and will email you back within 2 hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Hayes"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder:text-stone-400 focus:ring-2 focus:ring-orange-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jordan@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder:text-stone-400 focus:ring-2 focus:ring-orange-400 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder:text-stone-400 focus:ring-2 focus:ring-orange-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Topic / Inquiry
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-400 outline-none cursor-pointer"
                    >
                      <option value="General Inquiry">General Question</option>
                      <option value="Catering & Events">Event & Corporate Catering</option>
                      <option value="Cleanse Consultation">Juice Cleanse Advisory</option>
                      <option value="Wholesale">Wholesale & Distribution</option>
                      <option value="Feedback">Feedback / Suggestions</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Tell us what's on your mind..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder:text-stone-400 focus:ring-2 focus:ring-orange-400 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Interactive FAQ Accordion */}
          <div className="lg:col-span-6 space-y-4">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Frequently Asked Questions</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
                Everything You Need to Know
              </h3>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden bg-white dark:bg-stone-800/60 shadow-sm transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <span className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-white">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-orange-500 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
