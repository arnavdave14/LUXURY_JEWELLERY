import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { gsap } from '../utils/motion';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const FluidPortalScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const { openExhibition } = useShop();
  const chokerProduct = PRODUCTS[1]; // Celeste Pavé Choker

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Header tag reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
            },
          }
        );
      }

      // Layer 1 (Portrait) Entrance reveal
      if (layer1Ref.current) {
        gsap.fromTo(
          layer1Ref.current,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 75%',
            },
          }
        );

        gsap.to(layer1Ref.current, {
          y: -140,
          x: -40,
          ease: 'none',
          scrollTrigger: {
            id: 'fluid-layer-1',
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // Layer 2 (Macro Gemstone) Entrance reveal
      if (layer2Ref.current) {
        gsap.fromTo(
          layer2Ref.current,
          { opacity: 0, y: 90, scale: 0.92, rotate: 2 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 1.2,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 75%',
            },
          }
        );

        gsap.to(layer2Ref.current, {
          y: 120,
          x: 60,
          rotate: -3,
          ease: 'none',
          scrollTrigger: {
            id: 'fluid-layer-2',
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // Layer 3 (Refraction Scan)
      if (layer3Ref.current) {
        gsap.fromTo(
          layer3Ref.current,
          { opacity: 0, y: 60, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            delay: 0.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 70%',
            },
          }
        );

        gsap.to(layer3Ref.current, {
          y: -90,
          x: 80,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            id: 'fluid-layer-3',
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }

      // Layer 4 (Metallurgical Spec Box)
      if (layer4Ref.current) {
        gsap.fromTo(
          layer4Ref.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.35,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 70%',
            },
          }
        );

        gsap.to(layer4Ref.current, {
          y: 160,
          ease: 'none',
          scrollTrigger: {
            id: 'fluid-layer-4',
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.4,
          },
        });
      }

      if (title1Ref.current) {
        gsap.fromTo(
          title1Ref.current,
          { x: -100, opacity: 0.1 },
          {
            x: 40,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              id: 'fluid-title-1',
              trigger: container,
              start: 'top 75%',
              end: 'center 40%',
              scrub: 1,
            },
          }
        );
      }

      if (title2Ref.current) {
        gsap.fromTo(
          title2Ref.current,
          { x: 100, opacity: 0.1 },
          {
            x: -60,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              id: 'fluid-title-2',
              trigger: container,
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: 1,
            },
          }
        );
      }

      // Footer quote reveal
      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="fluid-portal"
      ref={containerRef}
      className="relative min-h-[140vh] w-full bg-pearl overflow-hidden py-24 md:py-36 px-6 md:px-14 flex flex-col justify-between"
    >
      {/* Background SVG Grid & Ambient Circles */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20vw" cy="40vh" r="240" fill="none" stroke="#A85F72" strokeWidth="0.5" strokeDasharray="6 6" />
          <circle cx="80vw" cy="80vh" r="320" fill="none" stroke="#A8AE91" strokeWidth="0.5" />
          <line x1="15vw" y1="0" x2="15vw" y2="100%" stroke="#30202D" strokeWidth="0.5" strokeDasharray="4 8" />
        </svg>
      </div>

      {/* Top Editorial Statements */}
      <div ref={headerRef} className="relative z-20 max-w-5xl space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-rose" />
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-rose font-bold">
            LIQUID LIGHT & LIVING ANATOMY
          </span>
        </div>

        <h2
          ref={title1Ref}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-light text-aubergine tracking-tight"
          style={{ willChange: 'transform, opacity' }}
        >
          WEAR THE
        </h2>
        <h2
          ref={title2Ref}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display italic font-light text-aubergine/85 tracking-tight pl-8 sm:pl-24"
          style={{ willChange: 'transform, opacity' }}
        >
          UNEXPECTED.
        </h2>
      </div>

      {/* Free-Positioned Layered Canvas */}
      <div className="relative z-10 my-16 w-full min-h-[700px] md:min-h-[850px]">
        
        {/* Layer 01: Off-Grid Large High-Fashion Portrait */}
        <div
          ref={layer1Ref}
          className="absolute top-0 left-[2vw] md:left-[6vw] w-[80vw] md:w-[42vw] z-10 cursor-pointer"
          onClick={() => openExhibition(chokerProduct)}
          data-cursor-product="CÉLESTE CHOKER"
          style={{ willChange: 'transform' }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-champagne/60 bg-porcelain group">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85"
              alt="High Fashion Clavicle Jewellery Model"
              className="w-full h-[460px] md:h-[600px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-aubergine/60 via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-6 left-6 right-6 text-porcelain">
              <span className="text-[9px] font-mono tracking-widest text-lime uppercase font-bold">
                ARTICULATED COLLAR
              </span>
              <h4 className="text-2xl md:text-3xl font-display mt-1">Céleste Pavé Choker</h4>
              <p className="text-xs font-mono text-porcelain/80 mt-1">320 Brilliant Diamonds • 18K Solid Gold Ribbon</p>
            </div>
          </div>
        </div>

        {/* Layer 02: Floating Macro Gemstone */}
        <div
          ref={layer2Ref}
          className="absolute top-[8vh] right-[4vw] md:right-[8vw] w-[45vw] md:w-[22vw] z-20 cursor-pointer"
          onClick={() => openExhibition(chokerProduct)}
          data-cursor-product="320 PAVÉ DIAMONDS"
          style={{ willChange: 'transform' }}
        >
          <div className="p-2 bg-porcelain/95 rounded-xl shadow-2xl border border-champagne backdrop-blur-md group">
            <div className="w-full h-52 md:h-72 overflow-hidden rounded-lg relative">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85"
                alt="Pavé Diamond Micro Details"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-aubergine/90 text-porcelain text-[8px] font-mono tracking-widest uppercase rounded">
                6.40ct F-G VVS
              </div>
            </div>
            <div className="p-2 space-y-1">
              <div className="flex items-center justify-between text-[9px] font-mono">
                <span className="text-aubergine font-bold">DOUBLE SAFETY CLASP</span>
                <span className="text-rose font-semibold uppercase">ATELIER PIECE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 03: Section-Breaking Detail Image */}
        <div
          ref={layer3Ref}
          className="absolute bottom-[-6vh] right-[-2vw] md:right-[4vw] w-[50vw] md:w-[24vw] z-15"
          style={{ willChange: 'transform' }}
        >
          <div className="p-1.5 bg-pearl/90 rounded-lg shadow-xl border border-border/60">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=85"
              alt="Light Caustics on Gold"
              className="w-full h-36 md:h-52 object-cover rounded"
            />
            <p className="text-[8px] font-mono text-muted tracking-widest uppercase p-1">
              OPTICAL REFRACTION SCAN
            </p>
          </div>
        </div>

        {/* Layer 04: Floating Metallurgical Annotation Box */}
        <div
          ref={layer4Ref}
          className="hidden lg:block absolute bottom-[14vh] left-[42vw] w-[18vw] z-25 p-4 bg-porcelain/90 backdrop-blur-md rounded-xl border border-champagne/80 shadow-lg text-xs font-mono"
          style={{ willChange: 'transform' }}
        >
          <div className="flex items-center gap-2 text-rose font-bold text-[9px] uppercase tracking-wider mb-1">
            <Sparkles size={11} /> ATELIER TOLERANCE
          </div>
          <p className="text-[10px] text-aubergine font-semibold">±0.02mm Cold-Forged Tension Matrix</p>
          <p className="text-[9px] text-muted mt-1 leading-tight">
            Each diamond is hand-seated into bespoke platinum cups for maximum ambient luminescence.
          </p>
        </div>

      </div>

      {/* Bottom Editorial Quote */}
      <div ref={footerRef} className="relative z-20 flex flex-col md:flex-row items-baseline justify-between border-t border-border/40 pt-8 gap-4">
        <div className="max-w-xl">
          <p className="text-lg md:text-2xl font-serif italic text-aubergine">
            “Jewellery does not complete an outfit; it defines the gravitational pull of the wearer.”
          </p>
          <span className="text-[9px] font-mono tracking-widest text-muted uppercase block mt-1">
            — MAISON AURELIA MANIFESTO MMXXVI
          </span>
        </div>

        <button
          onClick={() => openExhibition(chokerProduct)}
          className="flex items-center gap-2 text-xs font-mono tracking-widest text-aubergine hover:text-rose font-semibold uppercase group"
        >
          <span>EXHIBIT CÉLESTE MASTERPIECE</span>
          <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </section>
  );
};
