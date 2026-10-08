import React, { useRef, useEffect } from 'react';
import { Sparkles, Diamond } from 'lucide-react';

export const KineticEditorialMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x1 = 0;
    let x2 = 0;
    let x3 = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let animationFrameId: number;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      scrollVelocity = delta * 0.15; // Velocity booster
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      // Natural ambient speed + scroll velocity decay
      x1 -= (1.2 + Math.abs(scrollVelocity));
      x2 += (1.8 + Math.abs(scrollVelocity));
      x3 -= (1.0 + Math.abs(scrollVelocity));

      // Damping velocity smoothly
      scrollVelocity *= 0.92;

      // Infinite loop wrap calculation
      if (row1Ref.current) {
        const halfWidth = row1Ref.current.scrollWidth / 2;
        if (Math.abs(x1) >= halfWidth) x1 = 0;
        row1Ref.current.style.transform = `translate3d(${x1}px, 0, 0)`;
      }

      if (row2Ref.current) {
        const halfWidth = row2Ref.current.scrollWidth / 2;
        if (x2 >= 0) x2 = -halfWidth;
        row2Ref.current.style.transform = `translate3d(${x2}px, 0, 0)`;
      }

      if (row3Ref.current) {
        const halfWidth = row3Ref.current.scrollWidth / 2;
        if (Math.abs(x3) >= halfWidth) x3 = 0;
        row3Ref.current.style.transform = `translate3d(${x3}px, 0, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const marqueeRow1 = [
    'HAUTE JOAILLERIE',
    'PLACE VENDÔME PARIS',
    '4.82ct COLOMBIAN MUZO',
    '18K RECYCLED GOLD',
    'COLD-FORGED METALLURGY',
    'LIVING HEIRLOOMS',
    'OPTICAL DISPERSION',
    'HAND-SCULPTED TALONS'
  ];

  const marqueeRow2 = [
    'ZERO CAD TEMPLATES',
    'LOST-WAX PERDUE SCULPTURE',
    'MICROSCOPIC GEM SETTING',
    'CRITICAL ANGLE 2.417',
    '100% ETHICAL FAIRMINED',
    'BESPOKE COMMISSIONS',
    'ARCHITECTURAL LIGHT',
    'SLOW LUXURY ATELIER'
  ];

  const marqueeRow3 = [
    '“NOT AN ACCESSORY. AN ATTITUDE.”',
    'COLLECTION MMXXVI',
    'PIÈCES UNIQUES',
    '“WEAR THE UNEXPECTED”',
    'ATELIER PLACE VENDÔME',
    'THE GRAVITATIONAL PULL'
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-aubergine text-porcelain py-16 md:py-24 select-none my-12"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
      }}
    >
      {/* Background Micro Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#A85F72_1px,transparent_1px)] opacity-10 [background-size:16px_16px] pointer-events-none" />

      {/* Row 01: Massive Outlined & Filled Display Typography */}
      <div className="relative w-full overflow-hidden whitespace-nowrap mb-4 md:mb-6">
        <div ref={row1Ref} className="inline-flex items-center gap-8 will-change-transform">
          {[...marqueeRow1, ...marqueeRow1, ...marqueeRow1, ...marqueeRow1].map((text, i) => (
            <div key={i} className="inline-flex items-center gap-8 group cursor-default">
              <span
                className={`text-4xl sm:text-6xl md:text-8xl font-display uppercase tracking-tight transition-all duration-300 ${
                  i % 2 === 0
                    ? 'text-porcelain font-light group-hover:text-lime'
                    : 'text-transparent font-normal group-hover:text-rose'
                }`}
                style={{
                  WebkitTextStroke: i % 2 !== 0 ? '1px rgba(245, 241, 232, 0.45)' : 'none'
                }}
              >
                {text}
              </span>
              <span className="text-rose text-2xl group-hover:scale-125 transition-transform duration-300">
                ✧
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 02: High-Speed Secondary Pill Strip with Interactive Emblems */}
      <div className="relative w-full overflow-hidden whitespace-nowrap mb-4 md:mb-6">
        <div ref={row2Ref} className="inline-flex items-center gap-6 will-change-transform">
          {[...marqueeRow2, ...marqueeRow2, ...marqueeRow2, ...marqueeRow2].map((text, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-champagne/30 bg-porcelain/5 backdrop-blur-sm hover:bg-rose/20 hover:border-rose transition-all duration-300 group cursor-default"
            >
              <Sparkles size={13} className="text-lime group-hover:rotate-45 transition-transform" />
              <span className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-champagne font-bold group-hover:text-porcelain">
                {text}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose/60 group-hover:bg-lime" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 03: Editorial Poetic Italic Counter-Flow */}
      <div className="relative w-full overflow-hidden whitespace-nowrap">
        <div ref={row3Ref} className="inline-flex items-center gap-10 will-change-transform">
          {[...marqueeRow3, ...marqueeRow3, ...marqueeRow3, ...marqueeRow3].map((text, i) => (
            <div key={i} className="inline-flex items-center gap-10 group cursor-default">
              <span className="text-3xl sm:text-5xl md:text-6xl font-serif italic text-lilac/80 group-hover:text-porcelain tracking-wide transition-colors">
                {text}
              </span>
              <Diamond size={16} className="text-sage opacity-70 group-hover:scale-125 transition-transform" />
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Bottom Aesthetic Barcode & Coordinates */}
      <div className="mt-8 flex items-center justify-between px-8 md:px-14 text-[9px] font-mono tracking-widest text-muted/60 uppercase">
        <span>AURELIA // CONTINUOUS DIGITAL CANVAS</span>
        <span className="hidden sm:inline">VELOCITY-DRIVEN KINETIC TYPOGRAPHY MMXXVI</span>
        <span>48°52′0″ N • 2°19′59″ E</span>
      </div>
    </div>
  );
};
