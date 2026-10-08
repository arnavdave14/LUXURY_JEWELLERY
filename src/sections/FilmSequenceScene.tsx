import React, { useRef } from 'react';
import { Eye, Sparkles } from 'lucide-react';
import { ScrollImageSequence } from '../components/canvas/ScrollImageSequence';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const FilmSequenceScene: React.FC = () => {
  const { openExhibition } = useShop();
  const signature = PRODUCTS[0];

  const stageTitleRef = useRef<HTMLSpanElement>(null);
  const stageDescRef = useRef<HTMLParagraphElement>(null);
  const rotationTextRef = useRef<HTMLSpanElement>(null);

  const getStageTitle = (progress: number) => {
    if (progress < 0.2) return 'OPTICAL SEED';
    if (progress < 0.4) return 'REFLECTION AWAKENING';
    if (progress < 0.6) return '360° SPATIAL ROTATION';
    if (progress < 0.8) return 'CRITICAL ANGLE FOCUS';
    return 'CHROMATIC DISPERSION';
  };

  const getStageDescription = (progress: number) => {
    if (progress < 0.2) return 'Extreme macro scan of the high-jewellery solitaire as light enters the crystal matrix.';
    if (progress < 0.4) return 'Incident light strikes the facets, scattering high-fashion prismatic caustics.';
    if (progress < 0.6) return '360° fluid orbital camera sweep capturing liquid gold luster and gemstone fire.';
    if (progress < 0.8) return 'Precision inspection of the hand-sculpted architectural setting.';
    return 'Total internal reflection illuminating the microscopic crystalline structure.';
  };

  const handleFrameChange = (_idx: number, prog: number) => {
    if (stageTitleRef.current) {
      stageTitleRef.current.innerText = getStageTitle(prog);
    }
    if (stageDescRef.current) {
      stageDescRef.current.innerText = `“${getStageDescription(prog)}”`;
    }
    if (rotationTextRef.current) {
      rotationTextRef.current.innerText = `ROTATION: ${(prog * 360).toFixed(0)}°`;
    }
  };

  return (
    <section id="film-sequence" className="relative w-full bg-porcelain overflow-hidden">
      <ScrollImageSequence
        frameCount={300}
        framePath="/Frame1/ezgif-frame-"
        padLength={3}
        extension=".jpg"
        fallbackImage="/Frame1/ezgif-frame-001.jpg"
        start="top top"
        end="+=2600"
        scrub={0.35}
        objectFit="contain"
        onFrameChange={handleFrameChange}
      >
        {/* Top Header Floating Glass Capsule (Positioned safely below fixed navbar) */}
        <div className="flex items-center justify-between w-full max-w-[1720px] mx-auto pointer-events-auto pt-24 md:pt-28 px-4 md:px-8">
          <div className="px-5 py-3 rounded-full bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-champagne/40 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose animate-pulse" />
              <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-rose font-bold">
                CINEMATIC FILM
              </span>
            </div>
            <span className="w-px h-3.5 bg-champagne/80 hidden sm:inline-block" />
            <h2 className="text-sm sm:text-base md:text-lg font-display text-aubergine font-normal">
              Aurelia: Solitaire Motion Study
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => openExhibition(signature)}
              className="px-5 py-2.5 rounded-full bg-aubergine text-porcelain text-[10px] font-mono tracking-widest uppercase hover:bg-rose transition-colors flex items-center gap-1.5 shadow-md border border-aubergine"
            >
              <Eye size={12} /> EXHIBIT OBJECT
            </button>
            <button
              onClick={() => openExhibition(signature)}
              className="px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-2xl border border-white/80 text-aubergine text-[10px] font-mono tracking-widest uppercase hover:border-rose hover:text-rose transition-all shadow-sm ring-1 ring-champagne/40"
            >
              INQUIRE CREATION
            </button>
          </div>
        </div>

        {/* Center Emerald Ring is 100% UNBLOCKED & VISIBLE - Storytelling Card Docked to Bottom-Left Corner */}
        <div className="w-full max-w-[1720px] mx-auto pointer-events-auto px-4 md:px-8 pb-8 flex flex-col md:flex-row items-end justify-between gap-6">
          
          {/* Glassmorphic Storytelling Pill Card (Bottom-Left Corner) */}
          <div className="max-w-md w-full bg-white/65 backdrop-blur-2xl p-5 md:p-6 rounded-3xl border border-white/90 shadow-[0_20px_50px_rgba(48,32,45,0.12)] ring-1 ring-champagne/50 space-y-2.5 transition-all duration-300 hover:bg-white/80">
            <div className="flex items-center justify-between">
              <span
                ref={stageTitleRef}
                className="text-[9px] font-mono tracking-[0.25em] text-rose uppercase font-bold"
              >
                OPTICAL SEED
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/80 text-[8px] font-mono text-muted uppercase border border-champagne/60">
                FRAME 001 - 300
              </span>
            </div>

            <p
              ref={stageDescRef}
              className="text-xs md:text-sm font-serif italic text-aubergine leading-relaxed"
            >
              “Extreme macro scan of the high-jewellery solitaire as light enters the crystal matrix.”
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-champagne/40 text-[9px] font-mono text-muted uppercase">
              <span ref={rotationTextRef} className="text-aubergine font-bold">ROTATION: 0°</span>
              <span>MUZO GREEN FACETS</span>
              <span className="text-rose font-semibold flex items-center gap-1">
                <Sparkles size={10} /> 18K GOLD
              </span>
            </div>
          </div>

          {/* Bottom Right Specification Badge */}
          <div className="px-5 py-3 rounded-2xl bg-white/65 backdrop-blur-2xl border border-white/90 shadow-[0_15px_35px_rgba(48,32,45,0.08)] ring-1 ring-champagne/50 text-right space-y-0.5 hidden sm:block">
            <p className="text-xs font-mono font-bold text-aubergine uppercase tracking-wider">PIÈCE UNIQUE • MMXXVI</p>
            <p className="text-[9px] font-mono text-muted">18K RECYCLED GOLD & COLOMBIAN EMERALD</p>
          </div>
        </div>
      </ScrollImageSequence>
    </section>
  );
};

