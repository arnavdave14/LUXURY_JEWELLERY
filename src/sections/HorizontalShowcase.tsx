import React, { useRef, useEffect } from 'react';
import { Eye, Sparkles } from 'lucide-react';
import { gsap } from '../utils/motion';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const HorizontalShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleTrackRef = useRef<HTMLDivElement>(null);
  const { openExhibition } = useShop();

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const titleTrack = titleTrackRef.current;

    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - window.innerWidth + 120;

      // Master horizontal scroll for the cards track
      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          id: 'scene-horizontal-panorama',
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollWidth + 250}`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Synchronized horizontal scroll for the title banner above the images
      if (titleTrack) {
        const titleScrollWidth = titleTrack.scrollWidth - window.innerWidth;
        gsap.to(titleTrack, {
          x: -titleScrollWidth,
          ease: 'none',
          scrollTrigger: {
            id: 'scene-horizontal-title',
            trigger: container,
            start: 'top top',
            end: () => `+=${scrollWidth + 250}`,
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="horizontal-showcase"
      ref={containerRef}
      className="relative w-full h-screen bg-porcelain overflow-hidden select-none flex flex-col justify-between pt-[100px] md:pt-[115px] pb-6 box-border"
    >
      {/* Top Section Header */}
      <div className="px-8 md:px-14 flex items-center justify-between z-30 mb-2">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-rose animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-rose font-bold">
            HORIZONTAL EXHIBITION PANORAMA
          </span>
        </div>
      </div>

      {/* Synchronized Scrolling Editorial Headline Banner - Positioned ABOVE the images */}
      <div className="relative w-full overflow-hidden py-2.5 border-y border-champagne/60 bg-porcelain-light/90 backdrop-blur-md z-20 shadow-sm">
        <div
          ref={titleTrackRef}
          className="flex items-center gap-8 whitespace-nowrap px-8"
        >
          <div className="flex items-center gap-8 shrink-0">
            <span className="text-lg md:text-2xl lg:text-3xl font-display font-light text-aubergine tracking-wide">
              ARCHITECTURAL LIGHT
            </span>
            <span className="text-rose font-mono text-xs">✦</span>
            <span className="text-lg md:text-2xl lg:text-3xl font-display font-light text-aubergine/70 italic">
              SCULPTED 18K GOLD
            </span>
            <span className="text-rose font-mono text-xs">✦</span>
            <span className="text-lg md:text-2xl lg:text-3xl font-display font-light text-aubergine tracking-wide">
              COLOMBIAN MUZO EMERALDS
            </span>
            <span className="text-rose font-mono text-xs">✦</span>
            <span className="text-lg md:text-2xl lg:text-3xl font-display font-light text-aubergine/70 italic">
              LIVING HEIRLOOMS
            </span>
            <span className="text-rose font-mono text-xs">✦</span>
            <span className="text-lg md:text-2xl lg:text-3xl font-display font-light text-aubergine tracking-wide">
              HAUTE JOAILLERIE ATELIER
            </span>
            <span className="text-rose font-mono text-xs">✦</span>
            <span className="text-lg md:text-2xl lg:text-3xl font-display font-light text-aubergine/70 italic">
              PLACE VENDÔME PARIS
            </span>
            <span className="text-rose font-mono text-xs">✦</span>
          </div>

          {/* Repeat segment for seamless continuous scroll span */}
          <div className="flex items-center gap-8 shrink-0">
            <span className="text-lg md:text-2xl lg:text-3xl font-display font-light text-aubergine tracking-wide">
              ARCHITECTURAL LIGHT
            </span>
            <span className="text-rose font-mono text-xs">✦</span>
            <span className="text-lg md:text-2xl lg:text-3xl font-display font-light text-aubergine/70 italic">
              SCULPTED 18K GOLD
            </span>
            <span className="text-rose font-mono text-xs">✦</span>
            <span className="text-lg md:text-2xl lg:text-3xl font-display font-light text-aubergine tracking-wide">
              COLOMBIAN MUZO EMERALDS
            </span>
            <span className="text-rose font-mono text-xs">✦</span>
            <span className="text-lg md:text-2xl lg:text-3xl font-display font-light text-aubergine/70 italic">
              LIVING HEIRLOOMS
            </span>
            <span className="text-rose font-mono text-xs">✦</span>
          </div>
        </div>
      </div>

      {/* Main Horizontal Sliding Track of Image Cards */}
      <div className="relative w-full flex-1 flex items-center overflow-hidden my-auto py-2">
        <div
          ref={trackRef}
          className="flex items-center gap-8 md:gap-14 px-8 md:px-14 z-10"
        >
          {/* Slide 01: Massive Hero Frame */}
          <div
            className="w-[80vw] md:w-[48vw] max-w-[700px] shrink-0 h-[48vh] md:h-[52vh] relative rounded-2xl overflow-hidden shadow-2xl border border-champagne/70 bg-pearl cursor-pointer group"
            onClick={() => openExhibition(PRODUCTS[0])}
            data-cursor-product="AURELIA 4.82ct"
          >
            <img
              src="/Frame1/ezgif-frame-001.jpg"
              alt="Aurelia Masterpiece Ring"
              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=90';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-aubergine/80 via-aubergine/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-porcelain flex items-end justify-between">
              <div className="space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-lime uppercase font-bold">
                  PANORAMA PLATE 01 // ARCHIVE PIECE
                </span>
                <h3 className="text-xl md:text-3xl font-display">Aurelia Emerald Solitaire</h3>
                <p className="text-xs font-mono text-porcelain/80">4.82ct Muzo Emerald • 18K Solid Gold</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-porcelain/90 text-aubergine rounded-full text-xs font-mono uppercase font-bold shadow-lg group-hover:bg-rose group-hover:text-white transition-colors">
                <Eye size={14} /> EXHIBIT
              </div>
            </div>
          </div>

          {/* Slide 02: Vertical Editorial Portrait */}
          <div
            className="w-[60vw] md:w-[22vw] max-w-[320px] shrink-0 h-[44vh] md:h-[48vh] relative rounded-2xl overflow-hidden shadow-xl border border-champagne/70 bg-pearl cursor-pointer group"
            onClick={() => openExhibition(PRODUCTS[1])}
            data-cursor-product="CÉLESTE COLLAR"
          >
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85"
              alt="Céleste Diamond Choker"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
            />
            <div className="absolute top-3 left-3 px-2 py-0.5 bg-aubergine/90 text-porcelain text-[8px] font-mono tracking-widest uppercase rounded">
              320 BRILLIANT DIAMONDS
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-aubergine/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-porcelain/95 rounded-xl text-xs font-mono text-aubergine shadow-md border border-champagne/50">
              <p className="font-bold">Céleste Pavé Choker</p>
              <p className="text-[10px] text-muted">18K SOLID GOLD RIBBON</p>
            </div>
          </div>

          {/* Slide 03: Macro Lapidary Facet */}
          <div
            className="w-[46vw] md:w-[16vw] max-w-[220px] shrink-0 h-[38vh] md:h-[42vh] relative rounded-2xl overflow-hidden shadow-lg border border-champagne/60 bg-pearl cursor-pointer group"
            onClick={() => openExhibition(PRODUCTS[2])}
            data-cursor-product="SOUTH SEA PEARL"
          >
            <img
              src="https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=600&q=85"
              alt="Baroque Pearl Macro Texture"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-aubergine/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 p-2 bg-aubergine/90 text-porcelain rounded-lg text-[9px] font-mono text-center tracking-wider">
              ORGANIC BROOME PEARL
            </div>
          </div>

          {/* Slide 04: Wide Brutalist Tourmaline Cuff */}
          <div
            className="w-[72vw] md:w-[36vw] max-w-[500px] shrink-0 h-[46vh] md:h-[50vh] relative rounded-2xl overflow-hidden shadow-2xl border border-champagne/70 bg-pearl cursor-pointer group"
            onClick={() => openExhibition(PRODUCTS[3])}
            data-cursor-product="VESPER CUFF"
          >
            <img
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85"
              alt="Vesper Indicolite Cuff"
              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/Frame1/ezgif-frame-120.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-aubergine/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-porcelain flex items-baseline justify-between">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-rose uppercase font-bold">
                  PANORAMA PLATE 04 // 18K SATIN GOLD
                </span>
                <h4 className="text-xl md:text-2xl font-display">Vesper Indicolite Cuff</h4>
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-lime">PIÈCE UNIQUE</span>
            </div>
          </div>

          {/* Slide 05: Micro Gemological Annotation */}
          <div className="w-[40vw] md:w-[13vw] max-w-[190px] shrink-0 h-[32vh] p-4 rounded-2xl border border-champagne/80 bg-pearl/95 shadow-md flex flex-col justify-between text-xs font-mono">
            <div className="flex items-center gap-1.5 text-rose font-bold text-[9px] uppercase">
              <Sparkles size={12} /> CRITICAL ANGLE
            </div>
            <p className="text-[10px] text-aubergine font-semibold leading-relaxed">
              Total internal reflection index of 2.417 with optical chromatic dispersion.
            </p>
            <span className="text-[8px] text-muted uppercase tracking-wider">GIA ACCREDITED #9910</span>
          </div>

          {/* Slide 06: Final Panorama Sculpture */}
          <div
            className="w-[68vw] md:w-[32vw] max-w-[450px] shrink-0 h-[44vh] md:h-[48vh] relative rounded-2xl overflow-hidden shadow-2xl border border-champagne/70 bg-pearl cursor-pointer group"
            onClick={() => openExhibition(PRODUCTS[5])}
            data-cursor-product="NOCTURNE SIGNET"
          >
            <img
              src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=85"
              alt="Nocturne Onyx Signet Ring"
              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-aubergine/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-porcelain">
              <span className="text-[9px] font-mono tracking-widest text-lime uppercase font-bold">
                PANORAMA PLATE 06 // ARCHITECTURE
              </span>
              <h4 className="text-xl font-display">Nocturne Onyx Signet</h4>
              <p className="text-xs font-mono text-porcelain/80 mt-0.5">18K White Gold & Natural Black Onyx</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Traverse Indicator */}
      <div className="px-8 md:px-14 flex items-center justify-between z-30 pointer-events-none">
        <span className="text-[9px] font-mono tracking-widest text-muted uppercase">
          HORIZONTAL TRAVERSE →
        </span>
        <div className="flex items-center gap-2">
          <div className="w-16 h-0.5 bg-champagne rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-rose rounded-full" />
          </div>
          <span className="text-[8px] font-mono text-muted">04 / 09</span>
        </div>
      </div>
    </section>
  );
};
