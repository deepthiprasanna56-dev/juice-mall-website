import { useState } from 'react';
import { TESTIMONIALS, JUICE_PRODUCTS } from '../data/juiceData';
import { useCart } from '../context/CartContext';
import { Star, CheckCircle, MessageSquarePlus, X } from 'lucide-react';

export default function Testimonials() {
  const { triggerConfetti, showToast } = useCart();
  const [reviewsList, setReviewsList] = useState(TESTIMONIALS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Review Form state
  const [formName, setFormName] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formFlavor, setFormFlavor] = useState(JUICE_PRODUCTS[0].name);
  const [formRating, setFormRating] = useState(5);
  const [formText, setFormText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formText.trim()) {
      showToast('Please enter your name and review', 'error');
      return;
    }

    const newReview = {
      id: `review-${Date.now()}`,
      name: formName.trim(),
      location: formLocation.trim() || 'Verified Sipper',
      role: 'Juice Enthusiast',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
      rating: formRating,
      date: 'Just now',
      juiceTried: formFlavor,
      review: formText.trim(),
      verified: true,
    };

    setReviewsList([newReview, ...reviewsList]);
    triggerConfetti();
    showToast('Thank you! Your verified review has been posted 🌟');
    
    // Reset
    setFormName('');
    setFormLocation('');
    setFormText('');
    setFormRating(5);
    setIsModalOpen(false);
  };

  return (
    <section id="reviews" className="py-20 bg-stone-50/70 dark:bg-stone-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-xs font-bold mb-3 uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Real Experiences From Real Sippers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
            Loved by 15,000+ Daily Sippers
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600 dark:text-stone-300">
            From fitness coaches and busy parents to physicians and athletes, discover why people choose Juice Mall for their daily wellness ritual.
          </p>
        </div>

        {/* Rating Breakdown Banner */}
        <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-700/80 shadow-md mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Overall score */}
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="w-24 h-24 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 flex flex-col items-center justify-center font-black">
              <span className="text-4xl leading-none">4.9</span>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-bold mt-1">out of 5.0</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h3 className="font-extrabold text-stone-900 dark:text-white text-lg mt-1">
                Outstanding Excellence
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Based on 3,248 independently verified buyer reviews
              </p>
            </div>
          </div>

          {/* Quick Bar Breakdown */}
          <div className="w-full md:w-72 space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-12 text-stone-500 font-bold">5 Stars</span>
              <div className="flex-1 h-2 rounded-full bg-stone-100 dark:bg-stone-700 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '92%' }} />
              </div>
              <span className="w-8 font-bold text-right text-stone-700 dark:text-stone-300">92%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 text-stone-500 font-bold">4 Stars</span>
              <div className="flex-1 h-2 rounded-full bg-stone-100 dark:bg-stone-700 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '7%' }} />
              </div>
              <span className="w-8 font-bold text-right text-stone-700 dark:text-stone-300">7%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 text-stone-500 font-bold">3 Stars</span>
              <div className="flex-1 h-2 rounded-full bg-stone-100 dark:bg-stone-700 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '1%' }} />
              </div>
              <span className="w-8 font-bold text-right text-stone-700 dark:text-stone-300">1%</span>
            </div>
          </div>

          {/* Write a Review Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-orange-500/25 flex items-center gap-2 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewsList.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-stone-800 rounded-3xl p-6 border border-stone-200/80 dark:border-stone-700/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{item.date}</span>
                </div>

                {/* Tried Flavor Tag */}
                <span className="inline-block text-[11px] font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2.5 py-0.5 rounded-md mb-3">
                  Sipped: {item.juiceTried}
                </span>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 italic leading-relaxed">
                  "{item.review}"
                </p>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-3 pt-4 mt-4 border-t border-stone-100 dark:border-stone-700/60">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-200 dark:ring-stone-700"
                />
                <div className="leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold text-sm text-stone-900 dark:text-white">
                      {item.name}
                    </span>
                    {item.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" title="Verified Customer" />
                    )}
                  </div>
                  <span className="text-[11px] text-stone-400">
                    {item.location} • {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-stone-800 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-stone-900 dark:text-white mb-1">
              Share Your Juice Experience
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-6">
              Your honest feedback helps fellow health enthusiasts find their perfect cold-pressed blend.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setFormRating(star)}
                      className="p-1 focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          (hoverRating || formRating) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300 dark:text-stone-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-sm font-bold ml-2 text-stone-700 dark:text-stone-300">
                    {formRating} of 5 Stars
                  </span>
                </div>
              </div>

              {/* Name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    City, State
                  </label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="e.g. Portland, OR"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-400 outline-none"
                  />
                </div>
              </div>

              {/* Flavor Tried */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Which flavor did you sip?
                </label>
                <select
                  value={formFlavor}
                  onChange={(e) => setFormFlavor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-400 outline-none cursor-pointer"
                >
                  {JUICE_PRODUCTS.map((j) => (
                    <option key={j.id} value={j.name}>
                      {j.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Your Review *
                </label>
                <textarea
                  rows="3"
                  required
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  placeholder="How did the flavor taste? Did you feel more energized?"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
