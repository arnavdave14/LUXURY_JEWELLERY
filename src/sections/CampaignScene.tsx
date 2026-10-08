import React, { useEffect, useRef } from 'react';
import { Sparkles, Eye, ArrowRight } from 'lucide-react';
import { CAMPAIGN_DATA } from '../data/campaign';
import { gsap } from '../utils/motion';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const CampaignScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLHeadingElement>(null);
  const modelRef = useRef<HTMLImageElement>(null);
  const leftCalloutRef = useRef<HTMLDivElement>(null);
  const rightPillRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const creditsRef = useRef<HTMLDivElement>(null);

  const { openExhibition } = useShop();
  const campaignProduct = PRODUCTS[2]; // Sovereign Pearl

  useEffect(() => {
    const container = containerRef.current;
    const bgText = bgTextRef.current;
    const model = modelRef.current;
    const leftCallout = leftCalloutRef.current;
    const rightPill = rightPillRef.current;
    const star = starRef.current;
    const credits = creditsRef.current;

    if (!container) return;

    const ctx = gsap.context(() => {
      // Background large typography entrance + subtle parallax drift
      if (bgText) {
        gsap.fromTo(
          bgText,
          { opacity: 0, scale: 0.94, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
            },
          }
        );

        gsap.to(bgText, {
          y: -70,
          ease: 'none',
          scrollTrigger: {
            id: 'campaign-bgtext-drift',
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      // Cutout model entrance reveal + multi-plane parallax lift
      if (model) {
        gsap.fromTo(
          model,
          { opacity: 0, y: 90, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 75%',
            },
          }
        );

        gsap.to(model, {
          y: -45,
          scale: 1.03,
          ease: 'none',
          scrollTrigger: {
            id: 'campaign-model-drift',
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // Left price callout entrance
      if (leftCallout) {
        gsap.fromTo(
          leftCallout.children,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 0.12,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 75%',
            },
          }
        );
      }

      // Right action pill entrance
      if (rightPill) {
        gsap.fromTo(
          rightPill,
          { opacity: 0, x: 40, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 75%',
            },
          }
        );
      }

      // Golden sparkle star float animation
      if (star) {
        gsap.fromTo(
          star,
          { opacity: 0, scale: 0, rotation: -45 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            delay: 0.4,
            ease: 'elastic.out(1, 0.6)',
            scrollTrigger: {
              trigger: container,
              start: 'top 70%',
            },
          }
        );
      }

      // Bottom credits entrance
      if (credits) {
        gsap.fromTo(
          credits.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: credits,
              start: 'top 95%',
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="campaign-section"
      ref={containerRef}
      className="relative min-h-[105vh] w-full bg-gradient-to-b from-[#2F1F2C] via-[#241723] to-[#1A1019] text-[#F5F1E8] overflow-hidden py-16 md:py-24 px-6 md:px-14 flex flex-col justify-between select-none"
    >
      {/* Ambient Lighting & Luxury Orbital Geometry */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50%" cy="50%" rx="480" ry="320" fill="none" stroke="#E7D7C1" strokeWidth="0.5" strokeDasharray="4 8" />
          <ellipse cx="50%" cy="50%" rx="620" ry="420" fill="none" stroke="#A85F72" strokeWidth="0.5" />
          <circle cx="50%" cy="50%" r="280" fill="none" stroke="#D8CBD8" strokeWidth="0.25" strokeDasharray="6 12" />
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] max-w-[900px] max-h-[900px] bg-champagne/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Tagline */}
      <div className="relative z-20 flex items-center justify-between border-b border-white/10 pb-4 max-w-[1680px] mx-auto w-full">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-rose animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-champagne font-bold">
            {CAMPAIGN_DATA.tagline}
          </span>
        </div>
        <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase hidden sm:inline">
          {CAMPAIGN_DATA.year} EDITION • PLACE VENDÔME
        </span>
      </div>

      {/* Main Reference Canvas: Giant "JEWELLERY" Typography + Transparent Cutout Model */}
      <div className="relative z-10 my-auto w-full max-w-[1720px] mx-auto flex items-center justify-center min-h-[580px] md:min-h-[720px] lg:min-h-[780px]">
        
        {/* Layer 01: Giant Background Typography "JEWELLERY" */}
        <h2
          ref={bgTextRef}
          className="absolute inset-0 flex items-center justify-center text-center font-display font-light text-[17vw] md:text-[16.5vw] lg:text-[15.5vw] tracking-[0.06em] text-[#E7D7C1]/35 leading-none pointer-events-none select-none z-10"
        >
          JEWELLERY
        </h2>

        {/* Layer 02: Transparent Cutout Model Woman in Center Foreground */}
        <div className="relative z-20 flex items-end justify-center w-full h-full max-h-[78vh] pointer-events-auto">
          <img
            ref={modelRef}
            src="/campaign-model-cutout.png"
            alt="Maison Aurelia High Jewellery Campaign Model"
            className="h-[520px] sm:h-[620px] md:h-[720px] lg:h-[780px] w-auto object-contain object-bottom drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)] "
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=90';
            }}
          />
        </div>

        {/* Layer 03: Bottom Left Callout (Matching Reference Style: Price + Title) */}
        <div
          ref={leftCalloutRef}
          className="absolute bottom-6 md:bottom-12 left-4 md:left-10 z-30 space-y-1.5 pointer-events-auto cursor-pointer group"
          onClick={() => openExhibition(campaignProduct)}
        >
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-normal text-champagne tracking-tight group-hover:text-rose transition-colors">
            ₹199,000
          </div>
          <p className="text-sm sm:text-base md:text-lg font-serif italic text-[#F5F1E8]/90">
            Sovereign Gold Collar & Chandelier Suite
          </p>
          <div className="flex items-center gap-2 text-[9px] font-mono tracking-widest text-[#E7D7C1]/70 uppercase pt-0.5">
            <Sparkles size={11} className="text-rose" />
            <span>18K SOLID GOLD • HAND-CHASED MMXXVI</span>
          </div>
        </div>

        {/* Layer 04: Golden Sparkling Stars (Matching Reference Accent) */}
        <div
          ref={starRef}
          className="absolute bottom-16 md:bottom-24 right-8 md:right-24 z-30 pointer-events-none flex flex-col items-center gap-2"
        >
          <div className="text-champagne text-3xl md:text-4xl animate-pulse">
            ✦
          </div>
          <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-champagne/60">
            PIÈCE UNIQUE
          </span>
        </div>

        {/* Layer 05: Bottom Right Interactive Exhibit Action Pill */}
        <div
          ref={rightPillRef}
          className="hidden sm:flex absolute top-12 right-6 md:right-12 z-30 pointer-events-auto"
        >
          <button
            onClick={() => openExhibition(campaignProduct)}
            className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 hover:border-champagne text-[#F5F1E8] hover:text-champagne text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 shadow-2xl flex items-center gap-2 font-semibold hover:scale-105"
          >
            <Eye size={14} className="text-champagne" />
            <span>EXHIBIT SUITE</span>
            <ArrowRight size={12} />
          </button>
        </div>

      </div>

      {/* Campaign Credits Bar */}
      <div
        ref={creditsRef}
        className="relative z-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 border-t border-white/10 pt-6 text-[9px] font-mono text-white/50 max-w-[1680px] mx-auto w-full"
      >
        {CAMPAIGN_DATA.credits.map((c, idx) => (
          <div key={idx} className="space-y-0.5">
            <span className="text-champagne font-semibold block uppercase">{c.role}</span>
            <span className="text-white/70 block truncate">{c.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};


