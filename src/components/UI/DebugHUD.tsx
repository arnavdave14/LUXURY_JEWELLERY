import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, X, Gauge } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ScrollTrigger } from '../../utils/motion';

export const DebugHUD: React.FC = () => {
  const { isDebugOpen, setIsDebugOpen } = useShop();
  const [fps, setFps] = useState(60);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTrigger, setActiveTrigger] = useState('Hero Pinned Camera');

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = (time: number) => {
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (time - lastTime)));
        frameCount = 0;
        lastTime = time;
      }
      animId = requestAnimationFrame(calcFps);
    };

    animId = requestAnimationFrame(calcFps);

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      setScrollProgress(Math.round(progress));

      const triggers = ScrollTrigger.getAll();
      let currentName = 'Scene 01: Hero Pinned Camera';
      triggers.forEach((t) => {
        if (t.isActive) {
          currentName = t.vars.id ? String(t.vars.id) : (t.trigger as HTMLElement)?.id || 'Pinned Scene';
        }
      });
      setActiveTrigger(currentName);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleKey = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        setIsDebugOpen(!isDebugOpen);
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKey);
    };
  }, [isDebugOpen, setIsDebugOpen]);

  return (
    <>
      <button
        onClick={() => setIsDebugOpen(!isDebugOpen)}
        className="fixed bottom-6 left-6 z-40 w-8 h-8 rounded-full bg-aubergine/80 text-lime hover:bg-aubergine flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        aria-label="Toggle Developer Motion HUD"
        title="Developer Motion HUD (Shift+D)"
      >
        <Activity size={14} />
      </button>

      <AnimatePresence>
        {isDebugOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-16 left-6 z-40 bg-aubergine/95 backdrop-blur-md text-porcelain p-4 rounded-xl shadow-2xl border border-lime/30 w-72 text-xs font-mono space-y-2.5"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-lime font-bold">
                <Gauge size={14} />
                <span>MOTION ENGINE HUD</span>
              </div>
              <button
                onClick={() => setIsDebugOpen(false)}
                className="text-white/60 hover:text-white"
              >
                <X size={12} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/60">REFRESH RATE:</span>
              <span className={`font-bold ${fps >= 55 ? 'text-lime' : 'text-rose'}`}>{fps} FPS</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/60">GLOBAL SCROLL:</span>
              <span className="text-white font-bold">{scrollProgress}%</span>
            </div>

            <div className="flex flex-col gap-1 pt-1 border-t border-white/10">
              <span className="text-[9px] text-white/50 uppercase">ACTIVE SCROLL SCENE:</span>
              <span className="text-[10px] text-lime font-mono truncate">{activeTrigger}</span>
            </div>

            <div className="text-[8px] text-white/40 pt-1">
              PROD-MODE OPTIMIZED • PRESS SHIFT+D TO TOGGLE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
