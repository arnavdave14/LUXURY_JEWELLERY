import React, { useRef, useEffect } from 'react';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { gsap } from '../utils/motion';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const CollectionScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { openExhibition, toggleWishlist, isInWishlist } = useShop();

  const [p1, , p3, p4, p5] = PRODUCTS;

  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Header entrance reveal
      if (header) {
        gsap.fromTo(
          header.children,
          { opacity: 0, y: 45, filter: 'blur(4px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
            },
          }
        );
      }

      // Editorial floating cards scroll entrance reveals + parallax
      const items = container.querySelectorAll<HTMLElement>('.editorial-float-item');
      items.forEach((item, i) => {
        // Entrance animation when scrolled into view
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 70 + (i % 2 === 0 ? 30 : 50),
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
            },
          }
        );

        // Continuous silky parallax drift
        const yOffset = (i % 2 === 0 ? -1 : 1) * (40 + i * 15);
        gsap.to(item, {
          y: yOffset,
          ease: 'none',
          scrollTrigger: {
            id: `editorial-float-${i}`,
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.4,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collections"
      ref={containerRef}
      className="relative min-h-[190vh] w-full bg-porcelain overflow-hidden py-24 md:py-36 px-6 md:px-14"
    >
      <div ref={headerRef} className="max-w-4xl mx-auto text-center space-y-3 mb-24 relative z-10">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-rose font-bold block">
          THE EDITORIAL UNIVERSE
        </span>
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-light text-aubergine tracking-tight">
          SIGNATURE COLLECTION
        </h2>
        <p className="text-sm md:text-base font-serif text-muted max-w-xl mx-auto italic">
          Freeform celestial compositions, each piece existing as an unrepeatable work of wearable sculpture.
        </p>
      </div>

      <div className="relative w-full max-w-[1650px] mx-auto min-h-[1400px] z-10">
        
        {/* Item 01: Giant Asymmetrical Hero Feature */}
        <div
          className="editorial-float-item absolute top-0 left-0 w-full lg:w-[52vw] z-20 group"
          data-cursor-product={p1.name}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-champagne/60 bg-pearl">
            <div
              onClick={() => openExhibition(p1)}
              className="w-full h-[480px] md:h-[620px] overflow-hidden cursor-pointer"
            >
              <img
                src={p1.heroImage}
                alt={p1.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="p-6 md:p-8 bg-pearl/95 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-t border-border/40">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-muted/70">01 // {p1.collection}</span>
                <h3
                  onClick={() => openExhibition(p1)}
                  className="text-2xl md:text-3xl font-display text-aubergine hover:text-rose transition-colors cursor-pointer"
                >
                  {p1.name}
                </h3>
                <p className="text-xs font-mono text-muted uppercase">18K GOLD • HAND-SET COLOMBIAN EMERALD</p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <button
                  onClick={() => toggleWishlist(p1.id)}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-champagne/30 transition-colors"
                  aria-label="Save to dossier"
                >
                  <Heart size={14} className={isInWishlist(p1.id) ? 'fill-rose text-rose' : 'text-aubergine'} />
                </button>
                <button
                  onClick={() => openExhibition(p1)}
                  className="px-5 py-2.5 rounded-full bg-aubergine text-porcelain text-[10px] font-mono tracking-widest uppercase hover:bg-rose transition-colors flex items-center gap-1.5 font-bold shadow-md"
                >
                  <Sparkles size={12} className="text-lime" /> EXHIBIT CREATION
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Item 02: Floating Portrait & Macro Drop */}
        <div
          className="editorial-float-item absolute top-[100px] right-0 w-full lg:w-[36vw] z-15 group"
          data-cursor-product={p3.name}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-champagne/60 bg-pearl">
            <div
              onClick={() => openExhibition(p3)}
              className="w-full h-[380px] md:h-[460px] overflow-hidden cursor-pointer"
            >
              <img
                src={p3.heroImage}
                alt={p3.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="p-5 bg-pearl/95 border-t border-border/40 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] font-mono tracking-widest text-muted/70">02 // {p3.collection}</span>
                <span className="text-[9px] font-mono text-rose uppercase font-bold">PIÈCE UNIQUE</span>
              </div>
              <h3
                onClick={() => openExhibition(p3)}
                className="text-xl md:text-2xl font-display text-aubergine hover:text-rose cursor-pointer transition-colors"
              >
                {p3.name}
              </h3>
              <p className="text-xs font-mono text-muted uppercase">BROOME BAROQUE PEARL & ROSE-CUT DIAMONDS</p>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => openExhibition(p3)}
                  className="text-[10px] font-mono tracking-widest text-aubergine hover:text-rose font-bold uppercase flex items-center gap-1"
                >
                  VIEW DOSSIER <ArrowRight size={12} />
                </button>
                <button
                  onClick={() => toggleWishlist(p3.id)}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-champagne/30 transition-colors"
                  aria-label="Save to dossier"
                >
                  <Heart size={14} className={isInWishlist(p3.id) ? 'fill-rose text-rose' : 'text-aubergine'} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Item 03: Wide Horizontal Sculpture */}
        <div
          className="editorial-float-item absolute top-[680px] left-[4vw] md:left-[8vw] w-full lg:w-[58vw] z-25 group"
          data-cursor-product={p4.name}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-champagne/60 bg-pearl">
            <div
              onClick={() => openExhibition(p4)}
              className="w-full h-[360px] md:h-[440px] overflow-hidden cursor-pointer"
            >
              <img
                src={p4.heroImage}
                alt={p4.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/Frame1/ezgif-frame-120.jpg';
                }}
              />
            </div>

            <div className="p-6 bg-pearl/95 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border/40">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-muted/70">03 // {p4.collection}</span>
                <h3
                  onClick={() => openExhibition(p4)}
                  className="text-2xl font-display text-aubergine hover:text-rose cursor-pointer transition-colors"
                >
                  {p4.name}
                </h3>
                <p className="text-xs font-mono text-muted uppercase">PARAIBA TOURMALINE & HEAVY 18K SATIN GOLD</p>
              </div>

              <button
                onClick={() => openExhibition(p4)}
                className="px-5 py-2 rounded-full bg-aubergine text-porcelain text-[10px] font-mono tracking-widest uppercase hover:bg-rose transition-colors font-bold"
              >
                EXHIBIT ARCHIVE
              </button>
            </div>
          </div>
        </div>

        {/* Item 04: Petite Floating Talisman */}
        <div
          className="editorial-float-item absolute top-[1080px] right-[2vw] md:right-[6vw] w-full lg:w-[28vw] z-20 group"
          data-cursor-product={p5.name}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-champagne/60 bg-pearl">
            <div
              onClick={() => openExhibition(p5)}
              className="w-full h-[300px] md:h-[360px] overflow-hidden cursor-pointer"
            >
              <img
                src={p5.heroImage}
                alt={p5.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="p-5 bg-pearl/95 border-t border-border/40 space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-muted/70">04 // {p5.collection}</span>
              <h3
                onClick={() => openExhibition(p5)}
                className="text-xl font-display text-aubergine hover:text-rose cursor-pointer transition-colors"
              >
                {p5.name}
              </h3>
              <p className="text-xs font-mono text-muted uppercase">ANTIQUE PORTRAIT DIAMOND & ASTROLOGICAL DIAL</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[9px] font-mono text-muted uppercase">ATELIER ARCHIVE</span>
                <button
                  onClick={() => openExhibition(p5)}
                  className="text-[10px] font-mono tracking-widest text-aubergine hover:text-rose uppercase font-bold"
                >
                  EXHIBIT →
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
