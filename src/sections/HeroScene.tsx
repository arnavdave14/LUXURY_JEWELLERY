import React, { useEffect, useRef } from 'react';
import { ArrowDown, Sparkles, Eye, Compass } from 'lucide-react';
import { gsap, scrollToTarget } from '../utils/motion';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLImageElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const macroCardRef = useRef<HTMLDivElement>(null);
  const craftCardRef = useRef<HTMLDivElement>(null);
  const hudBadgeRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const { openExhibition } = useShop();
  const signatureProduct = PRODUCTS[0]; // Aurelia Solitaire

  // Ultra-lightweight GPU RAF mouse tracking (ZERO React state re-renders for buttery 120fps)
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currX = 0;
    let currY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    };

    const updatePhysics = () => {
      currX += (mouseX - currX) * 0.1;
      currY += (mouseY - currY) * 0.1;

      if (mainCardRef.current) {
        mainCardRef.current.style.transform = `perspective(1000px) rotateY(${currX * 6}deg) rotateX(${currY * -6}deg)`;
      }
      if (macroCardRef.current) {
        macroCardRef.current.style.transform = `translate3d(${currX * -15}px, ${currY * -15}px, 0)`;
      }
      if (craftCardRef.current) {
        craftCardRef.current.style.transform = `translate3d(${currX * -10}px, ${currY * -10}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(calc(-50% + ${currX * 40}px), calc(-50% + ${currY * 40}px))`;
      }

      rafId = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Smooth, buttery GSAP multi-plane parallax timeline (Light & responsive, no screen trap)
  useEffect(() => {
    const container = containerRef.current;
    const mainCard = mainCardRef.current;
    const mainImg = mainImageRef.current;
    const headline1 = headline1Ref.current;
    const headline2 = headline2Ref.current;
    const macroCard = macroCardRef.current;
    const craftCard = craftCardRef.current;
    const hudBadge = hudBadgeRef.current;
    const glow = glowRef.current;

    if (!container || !mainCard) return;

    const ctx = gsap.context(() => {
      // Intro entrance animation on initial mount
      gsap.fromTo(
        [headline1, headline2],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15 }
      );

      gsap.fromTo(
        mainCard,
        { opacity: 0, scale: 0.96, y: 25 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.15 }
      );

      gsap.fromTo(
        [macroCard, craftCard, hudBadge],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.1, delay: 0.3 }
      );

      // Scroll-driven buttery parallax (fluid and effortless)
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'hero-parallax',
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });

      if (headline1) {
        tl.to(headline1, { y: -70, x: -30, opacity: 0.45, ease: 'none' }, 0);
      }
      if (headline2) {
        tl.to(headline2, { y: -100, x: 40, opacity: 0.4, ease: 'none' }, 0);
      }
      if (mainCard) {
        tl.to(
          mainCard,
          {
            y: -50,
            scale: 1.03,
            opacity: 0.92,
            ease: 'none',
          },
          0
        );
      }
      if (mainImg) {
        tl.to(mainImg, { y: -10, scale: 1.04, ease: 'none' }, 0);
      }
      if (macroCard) {
        tl.to(macroCard, { y: -120, x: 25, opacity: 0.3, ease: 'none' }, 0);
      }
      if (craftCard) {
        tl.to(craftCard, { y: -80, x: -15, opacity: 0.3, ease: 'none' }, 0);
      }
      if (hudBadge) {
        tl.to(hudBadge, { y: -30, opacity: 0, ease: 'none' }, 0);
      }
      if (glow) {
        tl.to(glow, { scale: 1.15, opacity: 0.3, ease: 'none' }, 0);
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[100vh] bg-porcelain overflow-hidden flex items-center justify-center select-none pt-20 pb-16 md:py-0"
    >
      {/* Ambient Radial Lighting & Subtle Warm Gradient */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-champagne/25 rounded-full blur-[120px] pointer-events-none "
      />

      {/* Optical Axis Editorial Geometry */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="8vw" y1="0" x2="8vw" y2="100%" stroke="#30202D" strokeWidth="0.5" strokeDasharray="3 6" />
        <line x1="92vw" y1="0" x2="92vw" y2="100%" stroke="#30202D" strokeWidth="0.5" strokeDasharray="3 6" />
        <line x1="0" y1="18vh" x2="100%" y2="18vh" stroke="#30202D" strokeWidth="0.5" strokeDasharray="4 8" />
        <line x1="0" y1="84vh" x2="100%" y2="84vh" stroke="#30202D" strokeWidth="0.5" strokeDasharray="4 8" />
        <circle cx="86vw" cy="18vh" r="24" fill="none" stroke="#A85F72" strokeWidth="0.75" />
        <circle cx="86vw" cy="18vh" r="3" fill="#A85F72" />
        <text x="87.5vw" y="18.5vh" fontFamily="monospace" fontSize="8" fill="#756B73" letterSpacing="1">
          AXIS 01
        </text>
      </svg>

      {/* Background Oversized Serif Headline - Layer 01: "OBJECTS" */}
      <div className="absolute inset-0 z-10 flex flex-col justify-start pt-[12vh] md:pt-[14vh] pointer-events-none px-6 md:px-14">
        <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono tracking-[0.25em] text-rose uppercase mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose" />
          <span>HAUTE JOAILLERIE MMXXVI</span>
          <span className="text-muted/60">—</span>
          <span className="text-muted font-normal">SALON EDITION</span>
        </div>
        <h1
          ref={headline1Ref}
          className="text-[15vw] md:text-[14vw] leading-[0.82] font-display font-light text-aubergine/85 tracking-tight"
          
        >
          OBJECTS
        </h1>
      </div>

      {/* Background Oversized Serif Headline - Layer 02: "OF DESIRE." */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-[14vh] md:pb-[10vh] pointer-events-none px-6 md:px-14">
        <h2
          ref={headline2Ref}
          className="text-[15vw] md:text-[14vw] leading-[0.82] font-display font-light text-aubergine/90 tracking-tight text-right"
          
        >
          OF DESIRE.
        </h2>
      </div>

      {/* Floating Accent 01: Macro Diamond Geometry (Top Right) */}
      <div
        ref={macroCardRef}
        onClick={() => openExhibition(signatureProduct)}
        className="hidden md:block absolute top-[16vh] right-[6vw] lg:right-[8vw] w-[200px] z-25 pointer-events-auto cursor-pointer group "
        data-cursor-product="AURELIA 4.82ct"
      >
        <div className="p-2 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-champagne/60 transition-all duration-500 group-hover:shadow-xl group-hover:border-rose/50 group-hover:-translate-y-1">
          <div className="w-full h-32 overflow-hidden rounded-lg relative bg-porcelain-light">
            <img
              src="/Frame1/ezgif-frame-075.jpg"
              alt="Emerald Step Cut Macro Angle"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=85';
              }}
            />
            <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-aubergine/85 text-porcelain text-[7px] font-mono tracking-widest uppercase rounded">
              MACRO 20X
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between px-1">
            <span className="text-[8px] font-mono text-muted tracking-wider">VVS1 STEP-CUT</span>
            <span className="text-[8px] font-mono text-rose font-semibold flex items-center gap-0.5">
              <Sparkles size={8} /> 18K GOLD
            </span>
          </div>
        </div>
      </div>

      {/* Floating Accent 02: Atelier Craftsmanship (Bottom Left) */}
      <div
        ref={craftCardRef}
        onClick={() => scrollToTarget('#craft-section')}
        className="hidden md:block absolute bottom-[14vh] left-[6vw] lg:left-[8vw] w-[190px] z-25 pointer-events-auto cursor-pointer group "
      >
        <div className="p-2 bg-white/80 backdrop-blur-md rounded-xl shadow-md border border-champagne/60 transition-all duration-500 group-hover:shadow-xl group-hover:border-rose/50 group-hover:-translate-y-1">
          <div className="w-full h-24 overflow-hidden rounded-lg relative bg-porcelain-light">
            <img
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=85"
              alt="Atelier Goldsmith Sculpting Gold"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
            />
            <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-porcelain/90 text-aubergine text-[7px] font-mono tracking-widest uppercase rounded border border-champagne">
              CRAFT 01
            </div>
          </div>
          <div className="mt-1.5 flex items-center justify-between px-1">
            <p className="text-[8px] font-mono text-muted tracking-wider uppercase">
              PLACE VENDÔME
            </p>
            <Compass size={10} className="text-rose opacity-80" />
          </div>
        </div>
      </div>

      {/* Layer 03: Central Masterpiece Jewellery Showcase Card */}
      <div
        ref={mainCardRef}
        onClick={() => openExhibition(signatureProduct)}
        data-cursor-product="AURELIA SOLITAIRE"
        className="relative z-20 w-[86vw] md:w-[50vw] max-w-[620px] cursor-pointer group my-auto "
      >
        {/* Soft Golden Outer Aura */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-champagne/40 via-rose/15 to-champagne/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 group-hover:scale-102 transition-all duration-700 pointer-events-none" />

        {/* Elegant Frame Container */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-champagne/70 bg-pearl/90 backdrop-blur-md">
          {/* Top Plate Metadata Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-porcelain/80 border-b border-champagne/40 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-mono tracking-[0.2em] text-aubergine font-bold uppercase">
                AURELIA SOLITAIRE
              </span>
            </div>
            <span className="text-[9px] font-mono text-muted tracking-wider uppercase hidden sm:inline-block">
              18K RECYCLED GOLD
            </span>
          </div>

          {/* High-Resolution Centrepiece Image Display */}
          <div className="relative w-full aspect-[4/3] md:aspect-[16/11] overflow-hidden bg-porcelain-light flex items-center justify-center">
            <img
              ref={mainImageRef}
              src="/Frame1/ezgif-frame-001.jpg"
              alt="Aurelia Solitaire Haute Joaillerie Masterpiece"
              className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=90';
              }}
            />

            {/* Subtle Vignette Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-aubergine/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

            {/* Floating Quick Action Pill */}
            <div className="absolute bottom-4 right-4 px-3.5 py-1.5 bg-aubergine/90 text-porcelain backdrop-blur-md rounded-full text-[9px] md:text-[10px] font-mono tracking-[0.15em] uppercase flex items-center gap-2 shadow-lg group-hover:bg-rose group-hover:text-white transition-all duration-300">
              <Eye size={12} className="text-lime group-hover:text-white" />
              <span>EXHIBIT MASTERPIECE</span>
            </div>

            {/* Gemstone Spec Badge */}
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-porcelain/90 text-aubergine backdrop-blur-md rounded-full text-[9px] font-mono tracking-wider uppercase border border-champagne shadow-sm">
              <span className="text-rose font-bold">4.82ct</span> MUZO EMERALD CUT
            </div>
          </div>
        </div>
      </div>

      {/* Editorial HUD & Bottom Callout */}
      <div
        ref={hudBadgeRef}
        className="absolute bottom-6 left-6 md:left-14 right-6 md:right-14 z-30 flex items-end justify-between pointer-events-none"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-rose uppercase font-semibold">
            <span>SALON MMXXVI</span>
            <span className="text-muted/50">•</span>
            <span className="text-muted">LIMITED ARCHIVE EDITION</span>
          </div>
          <p className="text-[9px] md:text-[10px] font-mono text-muted max-w-xs leading-relaxed hidden sm:block">
            Hand-sculpted 18K gold & Colombian Muzo emerald. Designed for eternal light transmission.
          </p>
        </div>

        <button
          onClick={() => scrollToTarget('#fluid-portal')}
          className="pointer-events-auto flex items-center gap-2 text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase text-aubergine hover:text-rose transition-colors py-2 px-3 rounded-full hover:bg-champagne/20"
          aria-label="Scroll to discover collection"
        >
          <span>EXPLORE CANVAS</span>
          <ArrowDown size={14} className="animate-bounce text-rose" />
        </button>
      </div>
    </section>
  );
};
