import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform translate-y-0 opacity-100 max-w-sm sm:max-w-md w-full px-4 pointer-events-none">
      <div
        className={`flex items-center gap-3 p-4 rounded-2xl shadow-2xl border backdrop-blur-md transition-all ${
          isSuccess
            ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/30'
            : isError
            ? 'bg-rose-950/90 text-rose-100 border-rose-500/30'
            : 'bg-stone-900/90 text-white border-stone-700/50'
        }`}
      >
        <div className="shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-amber-400" />}
        </div>
        <p className="text-sm font-medium leading-snug flex-1">{toast.message}</p>
      </div>
    </div>
  );
}
