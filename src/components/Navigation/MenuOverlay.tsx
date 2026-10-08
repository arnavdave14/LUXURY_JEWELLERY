import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Phone } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { scrollToTarget } from '../../utils/motion';

export const MenuOverlay: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen, setIsConciergeOpen, setIsDebugOpen } = useShop();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const menuItems = [
    { title: 'COLLECTIONS', subtitle: 'L’Émeraude, Celeste, Solstice', target: '#collections', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=85', dir: 'left' },
    { title: 'JEWELLERY', subtitle: 'Master Catalog & Digital Exhibition', target: '#horizontal-showcase', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85', dir: 'right' },
    { title: 'THE FILM', subtitle: 'Interactive 8K Frame Sequence', target: '#film-sequence', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=85', dir: 'bottom' },
    { title: 'CRAFT', subtitle: '6-Stage High Metallurgy', target: '#craft-section', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=85', dir: 'scale' },
    { title: 'CAMPAIGN', subtitle: 'Not An Accessory. An Attitude.', target: '#campaign-section', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85', dir: 'left' },
    { title: 'THE HOUSE', subtitle: 'Paris & Jaipur Heritage', target: '#the-house', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=85', dir: 'right' },
    { title: 'JOURNAL', subtitle: 'Essays on Gemology & Light', target: '#the-house', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=85', dir: 'bottom' },
  ];

  const handleNavigate = (target: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      scrollToTarget(target);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-porcelain text-aubergine flex flex-col justify-between p-6 md:p-14 overflow-y-auto no-scrollbar"
        >
          {/* Background Ambient Mood Images */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15 transition-opacity duration-700">
            {menuItems.map((item, idx) => (
              <img
                key={item.title}
                src={item.image}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover filter blur-[2px] transition-all duration-700 ${
                  hoveredIdx === idx ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                }`}
              />
            ))}
          </div>

          {/* Top Bar inside Menu */}
          <div className="relative z-10 flex items-center justify-between border-b border-border/40 pb-6">
            <div className="flex items-center gap-3">
              <span className="text-xl md:text-2xl font-display tracking-[0.3em] font-light">AURELIA</span>
              <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
                DIGITAL PAVILION
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsConciergeOpen(true);
                }}
                className="hidden sm:flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase px-4 py-2 rounded-full border border-border hover:border-aubergine transition-colors"
              >
                <Phone size={12} />
                <span>PRIVATE CONCIERGE</span>
              </button>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-aubergine hover:text-porcelain transition-all"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Center Main Staggered Typography Menu */}
          <div className="relative z-10 my-8 md:my-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Huge Staggered Headings */}
            <div className="lg:col-span-8 flex flex-col space-y-2 md:space-y-4">
              {menuItems.map((item, idx) => {
                const initialMotion =
                  item.dir === 'left'
                    ? { x: -60, opacity: 0 }
                    : item.dir === 'right'
                    ? { x: 60, opacity: 0 }
                    : item.dir === 'bottom'
                    ? { y: 60, opacity: 0 }
                    : { scale: 0.85, opacity: 0 };

                return (
                  <motion.div
                    key={item.title}
                    initial={initialMotion}
                    animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.08 * idx,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="group"
                  >
                    <button
                      onClick={() => handleNavigate(item.target)}
                      className="w-full text-left flex items-baseline justify-between py-1 transition-transform group-hover:translate-x-3 duration-300"
                    >
                      <div className="flex items-baseline gap-4 md:gap-8">
                        <span className="text-[10px] md:text-xs font-mono text-muted/60">
                          0{idx + 1}
                        </span>
                        <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display tracking-tight text-aubergine group-hover:text-rose transition-colors duration-300">
                          {item.title}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={24}
                        className="opacity-0 group-hover:opacity-100 text-rose -translate-x-3 group-hover:translate-x-0 transition-all duration-300"
                      />
                    </button>
                    <p className="text-[11px] font-mono tracking-widest text-muted/80 ml-10 md:ml-16 uppercase">
                      {item.subtitle}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Column */}
            <div className="hidden lg:flex lg:col-span-4 flex-col items-center justify-center p-6">
              <div className="w-72 h-96 relative overflow-hidden rounded-lg shadow-2xl border border-champagne/50 bg-pearl">
                <img
                  src={
                    hoveredIdx !== null
                      ? menuItems[hoveredIdx].image
                      : 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=85'
                  }
                  alt="Aurelia Haute Art"
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-aubergine/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-porcelain">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-lime">
                    EXHIBITION ARCHIVE
                  </span>
                  <p className="text-xs font-serif mt-1">
                    {hoveredIdx !== null
                      ? menuItems[hoveredIdx].title
                      : 'Aurelia Place Vendôme Collection'}
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center space-y-1">
                <p className="text-[10px] font-mono tracking-widest text-aubergine uppercase font-semibold">
                  PARIS // JAIPUR // MILANO
                </p>
                <p className="text-[9px] font-mono text-muted">
                  N 48° 52′ 0″ E 2° 19′ 59″ • APPOINTMENT ONLY
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar inside Menu */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between border-t border-border/40 pt-6 gap-4">
            <div className="flex items-center gap-6 text-[10px] font-mono tracking-widest text-muted uppercase">
              <a href="#hero" onClick={() => handleNavigate('#hero')} className="hover:text-aubergine">INSTAGRAM</a>
              <a href="#the-house" onClick={() => handleNavigate('#the-house')} className="hover:text-aubergine">ARCHIVE</a>
              <a href="#the-house" onClick={() => handleNavigate('#the-house')} className="hover:text-aubergine">SALON VENDÔME</a>
              <button onClick={() => setIsDebugOpen(true)} className="hover:text-rose">DEVELOPER HUD</button>
            </div>

            <p className="text-[10px] font-mono text-muted/60 tracking-wider">
              © MMXXVI MAISON AURELIA. ALL RIGHTS RESERVED.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
