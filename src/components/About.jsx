import { Leaf, Award, Recycle, ShieldCheck, CheckCircle2 } from 'lucide-react';

const PILLARS = [
  {
    icon: Leaf,
    title: '100% Organic Orchards',
    desc: 'We partner directly with certified family orchards in California, Florida, and Washington, ensuring zero synthetic pesticides or genetic modifications.'
  },
  {
    icon: Award,
    title: 'Hydraulic Cold Pressing',
    desc: 'Unlike blenders or centrifugal blades that generate heat and oxidize nutrients, our 2-ton cold hydraulic press preserves delicate vitamins and live enzymes intact.'
  },
  {
    icon: Recycle,
    title: 'Zero Waste & Recyclable',
    desc: 'All spent fruit pulp is donated to local organic compost farms, and every bottle is crafted with 100% recyclable, BPA-free or reusable glass materials.'
  },
  {
    icon: ShieldCheck,
    title: 'Chilled Cold-Chain Always',
    desc: 'From the exact moment of pressing to when the bottle reaches your doorstep, our juices are kept strictly between 34°F - 38°F with insulated thermal bags.'
  }
];

const STEPS = [
  {
    num: '01',
    title: 'Sunrise Orchard Harvest',
    desc: 'Hand-picked at peak ripeness when natural brix sugar and vitamin concentrations are at their absolute seasonal peak.'
  },
  {
    num: '02',
    title: 'Ozone Sanitization & Trim',
    desc: 'Triple-washed in micro-filtered cold ozone water, cored, and peeled by hand without harsh chemicals or thermal water.'
  },
  {
    num: '03',
    title: 'Cold Hydraulic Extraction',
    desc: 'Slowly pressed under 4,000 lbs of hydraulic force. No heating, no boiling, and zero water or sugar fillers.'
  },
  {
    num: '04',
    title: 'Chilled Delivery in < 24 Hours',
    desc: 'Sealed cold and packed with non-toxic frozen ice packs, delivering living nutrition straight into your daily routine.'
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 relative bg-white dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5" />
              <span>Our Philosophy & Roots</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
              We Believe Pure Nutrition Should Never Be Heated or Compromised.
            </h2>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              Juice Mall was founded on a simple realization: supermarket "healthy juices" are cooked at high pasteurization temperatures to sit on shelves for months, destroying the vital live enzymes nature intended.
            </p>

            <p className="text-sm sm:text-base text-stone-500 dark:text-stone-400 leading-relaxed">
              We rebelled against industrial shortcuts. By extracting fresh juices every morning using hydraulic cold-press technology, we deliver authentic vitality—the vibrant aroma, crisp natural flavor, and raw cellular nourishment of living fruits and botanicals.
            </p>

            {/* Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero pasteurization or boiling</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero added water, syrups, or colors</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Small batch pressed daily</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Inspected by certified nutritionists</span>
              </div>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
                alt="Organic farm harvesting fresh greens"
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xl">
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider block">
                  Fresh Press Guarantee
                </span>
                <p className="text-sm font-bold text-stone-900 dark:text-white mt-0.5">
                  "If your cold-pressed juice isn't the crispest, freshest sip you've had all week, we'll replace it on us."
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars of Excellence */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
              The Juice Mall Standard
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
              Every single bottle we craft adheres to four non-negotiable promises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-stone-50 dark:bg-stone-800/60 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-700/60 hover:border-orange-300 transition-all duration-300 hover:-translate-y-1 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-lg text-stone-900 dark:text-white mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Farm to Bottle Journey Timeline */}
        <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-emerald-50 dark:from-stone-800 dark:via-stone-800/80 dark:to-stone-800/60 rounded-3xl p-8 sm:p-12 border border-orange-100 dark:border-stone-700/60 shadow-lg">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Farm-To-Bottle Protocol
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white mt-1">
              How We Bottle Pure Sunshine
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="relative bg-white/90 dark:bg-stone-900/90 p-5 rounded-2xl shadow-sm border border-stone-200/70 dark:border-stone-700/70">
                <span className="font-mono text-3xl font-black text-orange-500/30 dark:text-orange-400/20 block mb-1">
                  {step.num}
                </span>
                <h4 className="font-bold text-base text-stone-900 dark:text-white mb-1.5">
                  {step.title}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
