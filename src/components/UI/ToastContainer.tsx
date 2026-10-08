import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, Heart, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="pointer-events-auto bg-porcelain/95 backdrop-blur-md border border-champagne rounded-xl p-4 shadow-2xl flex items-start justify-between gap-3 text-aubergine"
          >
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-champagne/40 flex items-center justify-center shrink-0 mt-0.5 text-aubergine">
                {toast.type === 'success' ? (
                  <Check size={14} className="text-sage font-bold" />
                ) : toast.type === 'wishlist' ? (
                  <Heart size={14} className="fill-rose text-rose" />
                ) : (
                  <Sparkles size={14} className="text-aubergine" />
                )}
              </div>
              <div className="space-y-0.5">
                <h6 className="text-[10px] font-mono tracking-widest uppercase font-bold text-aubergine">
                  {toast.title}
                </h6>
                <p className="text-xs font-serif text-muted leading-tight">
                  {toast.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-muted/60 hover:text-aubergine transition-colors p-1"
              aria-label="Dismiss toast"
            >
              <X size={12} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
