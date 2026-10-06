import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FlaskConical, Check, ShoppingBag } from 'lucide-react';

const BASES = [
  { id: 'base-orange', name: 'Cold-Pressed Valencia Orange', calories: 60, vitC: '100%', color: 'bg-amber-100 text-amber-900 border-amber-300' },
  { id: 'base-coconut', name: 'Raw Young Coconut Water', calories: 45, vitC: '30%', color: 'bg-emerald-50 text-emerald-900 border-emerald-300' },
  { id: 'base-apple', name: 'Crisp Granny Smith Cider', calories: 65, vitC: '40%', color: 'bg-lime-50 text-lime-900 border-lime-300' },
  { id: 'base-almond', name: 'Creamy Vanilla Oat-Almond Milk', calories: 75, vitC: '20%', color: 'bg-stone-100 text-stone-900 border-stone-300' }
];

const FRUITS = [
  { id: 'f-mango', name: 'Alphonso Mango', tag: 'Tropical Sweet', icon: '🥭', cal: 35 },
  { id: 'f-berries', name: 'Wild Blueberries', tag: 'Antioxidants', icon: '🫐', cal: 30 },
  { id: 'f-strawberry', name: 'Sweet Strawberry', tag: 'Vitamin C', icon: '🍓', cal: 25 },
  { id: 'f-dragon', name: 'Pink Dragonfruit', tag: 'Exotic Glow', icon: '🌺', cal: 28 },
  { id: 'f-pineapple', name: 'Golden Pineapple', tag: 'Digestive Enzymes', icon: '🍍', cal: 32 },
  { id: 'f-kale', name: 'Organic Curly Kale', tag: 'Detox Chlorophyll', icon: '🥬', cal: 15 },
  { id: 'f-kiwi', name: 'Zesty Green Kiwi', tag: 'Immunity Hit', icon: '🥝', cal: 25 },
  { id: 'f-watermelon', name: 'Chilled Watermelon', tag: 'Deep Hydration', icon: '🍉', cal: 20 }
];

const BOOSTS = [
  { id: 'b-ginger', name: 'Fresh Peruvian Ginger Shot', benefit: '+Metabolism & Digestive Fire', icon: '🫚' },
  { id: 'b-spirulina', name: 'Blue Majik Spirulina', benefit: '+Clean Vegan Phycocyanin', icon: '🌊' },
  { id: 'b-chia', name: 'Hydrated Chia Seeds', benefit: '+Omega 3 & Fiber', icon: '🌱' },
  { id: 'b-turmeric', name: 'Raw Turmeric & BioPerine', benefit: '+Anti-inflammatory', icon: '✨' },
  { id: 'b-protein', name: 'Plant Pea Protein (+15g)', benefit: '+Muscle Fuel', icon: '💪' }
];

export default function JuiceLab() {
  const { addToCart, triggerConfetti, showToast } = useCart();
  const [selectedBase, setSelectedBase] = useState(BASES[0]);
  const [selectedFruits, setSelectedFruits] = useState([FRUITS[0], FRUITS[1]]);
  const [selectedBoost, setSelectedBoost] = useState(BOOSTS[0]);

  const toggleFruit = (fruit) => {
    if (selectedFruits.some((f) => f.id === fruit.id)) {
      if (selectedFruits.length > 1) {
        setSelectedFruits((prev) => prev.filter((f) => f.id !== fruit.id));
      }
    } else {
      if (selectedFruits.length < 3) {
        setSelectedFruits((prev) => [...prev, fruit]);
      } else {
        setSelectedFruits((prev) => [prev[1], prev[2], fruit]);
      }
    }
  };

  const calculatedCalories =
    selectedBase.calories +
    selectedFruits.reduce((acc, f) => acc + f.cal, 0) +
    20;

  const blendName = `${selectedFruits.map((f) => f.name.split(' ')[0]).join(' ')} ${selectedBase.name.split(' ')[1] || 'Elixir'}`;

  const handleAddCustomBlend = () => {
    const customProduct = {
      id: `custom-blend-${Date.now()}`,
      name: `Custom Blend: ${blendName}`,
      price: 8.49,
      image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
      size: '500ml Bespoke',
      category: 'Custom Blend',
      tagline: `Base: ${selectedBase.name} • Fruits: ${selectedFruits.map((f) => f.name).join(', ')} • Boost: ${selectedBoost.name}`
    };
    addToCart(customProduct, 1);
    triggerConfetti();
    showToast(`Your custom "${blendName}" blend was added to cart! 🧪🥤`);
  };

  return (
    <section id="lab" className="py-20 bg-gradient-to-b from-stone-50 to-orange-50/40 dark:from-stone-900/50 dark:to-stone-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 text-xs font-bold mb-3 uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5 text-orange-500" />
            <span>Interactive Nutrition Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
            Craft Your Custom Juice Blend
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600 dark:text-stone-300">
            Be your own mixologist! Select your cold-pressed liquid base, choose up to 3 fresh organic whole fruits, and add a medicinal superfood booster.
          </p>
        </div>

        {/* Builder Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls: Step 1, 2, 3 */}
          <div className="lg:col-span-8 space-y-8 bg-white dark:bg-stone-800/90 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-700/80 shadow-md">
            
            {/* Step 1: Base */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-orange-500">
                  Step 1: Choose Liquid Base
                </span>
                <span className="text-xs text-stone-400 font-medium">1 Base required</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BASES.map((b) => {
                  const isSelected = selectedBase.id === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBase(b)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50/80 dark:bg-orange-950/40 text-stone-900 dark:text-white shadow-md'
                          : 'border-stone-200 dark:border-stone-700 hover:border-orange-300 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-sm block">{b.name}</span>
                        <span className="text-xs text-stone-400">{b.calories} kcal • {b.vitC} Vit C</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        isSelected ? 'border-orange-500 bg-orange-500 text-white' : 'border-stone-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Fruits */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-orange-500">
                  Step 2: Select 2 to 3 Whole Fruits & Greens
                </span>
                <span className="text-xs text-stone-400 font-medium">
                  {selectedFruits.length}/3 Selected
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {FRUITS.map((fruit) => {
                  const isSelected = selectedFruits.some((f) => f.id === fruit.id);
                  return (
                    <button
                      key={fruit.id}
                      onClick={() => toggleFruit(fruit)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-stone-900 dark:text-white shadow-md scale-102'
                          : 'border-stone-200 dark:border-stone-700 hover:border-emerald-300 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <span className="text-2xl mb-1">{fruit.icon}</span>
                      <span className="font-bold text-xs block">{fruit.name}</span>
                      <span className="text-[10px] text-stone-400 block">{fruit.tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Boost */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-orange-500">
                  Step 3: Superfood Booster Shot
                </span>
                <span className="text-xs text-stone-400 font-medium">Included free</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {BOOSTS.map((boost) => {
                  const isSelected = selectedBoost.id === boost.id;
                  return (
                    <button
                      key={boost.id}
                      onClick={() => setSelectedBoost(boost)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/40 text-stone-900 dark:text-white shadow-md'
                          : 'border-stone-200 dark:border-stone-700 hover:border-amber-300 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <span className="text-xl">{boost.icon}</span>
                      <div>
                        <span className="font-bold text-xs block leading-tight">{boost.name}</span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400">{boost.benefit}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Preview Card: Live Nutrition & Add Button */}
          <div className="lg:col-span-4 sticky top-24 bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-stone-800 space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-orange-500 text-white">
                Bespoke Bottle
              </span>
              <span className="text-xs text-stone-400">500ml Bottle</span>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Your Recipe Name:
              </span>
              <h3 className="text-2xl font-black mt-1 text-white">
                {blendName}
              </h3>
            </div>

            {/* Selected Components Summary */}
            <div className="space-y-2 text-xs border-y border-stone-800 py-4">
              <div className="flex justify-between text-stone-400">
                <span>Base Liquid:</span>
                <span className="text-stone-200 font-bold">{selectedBase.name}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Whole Fruits:</span>
                <span className="text-stone-200 font-bold">
                  {selectedFruits.map((f) => f.name.split(' ')[0]).join(', ')}
                </span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Superfood Shot:</span>
                <span className="text-amber-400 font-bold">{selectedBoost.name}</span>
              </div>
            </div>

            {/* Estimated Nutrition Stats */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700/60">
                <span className="text-[10px] text-stone-400 block uppercase font-bold">Est. Calories</span>
                <span className="text-lg font-black text-white">{calculatedCalories} kcal</span>
              </div>
              <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700/60">
                <span className="text-[10px] text-stone-400 block uppercase font-bold">Vitamin C Boost</span>
                <span className="text-lg font-black text-emerald-400">180%+ DV</span>
              </div>
            </div>

            {/* Price & Add to Cart button */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-stone-300">Custom Blend Price:</span>
                <span className="text-2xl font-black text-orange-400">$8.49</span>
              </div>

              <button
                onClick={handleAddCustomBlend}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Custom Blend</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
