import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { gsap, ScrollTrigger } from '../utils/motion';
import { CRAFT_STEPS } from '../data/craft';

export const CraftScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pillNavRef = useRef<HTMLDivElement>(null);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const activeStep = CRAFT_STEPS[activeStepIdx];

  // Auto-scroll-driven step changer using GSAP ScrollTrigger
  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const pillNav = pillNavRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Header and pills entrance animation
      if (header) {
        gsap.fromTo(
          header.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
            },
          }
        );
      }

      if (pillNav) {
        gsap.fromTo(
          pillNav,
          { opacity: 0, y: 25, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
            },
          }
        );
      }
    }, container);

    const totalSteps = CRAFT_STEPS.length;

    const st = ScrollTrigger.create({
      id: 'craft-scene-scroll-tabs',
      trigger: container,
      start: 'top top',
      end: '+=2200',
      pin: true,
      scrub: 0.4,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Map 0 -> 1 progress smoothly across the 6 steps
        const step = Math.min(totalSteps - 1, Math.floor(self.progress * totalSteps));
        setActiveStepIdx(step);
      },
    });

    return () => {
      ctx.revert();
      st.kill();
    };
  }, []);

  // Center the active pill tab smoothly in the horizontal nav
  useEffect(() => {
    if (pillNavRef.current) {
      const activeBtn = pillNavRef.current.children[activeStepIdx] as HTMLElement;
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeStepIdx]);

  const handleStepClick = (idx: number) => {
    setActiveStepIdx(idx);
    const st = ScrollTrigger.getById('craft-scene-scroll-tabs');
    if (st) {
      const totalSteps = CRAFT_STEPS.length;
      const targetProgress = (idx + 0.5) / totalSteps;
      const targetScroll = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="craft-section"
      ref={containerRef}
      className="relative w-full h-screen bg-pearl overflow-hidden flex flex-col justify-between pt-20 md:pt-24 pb-8 md:pb-10 px-6 md:px-14 select-none"
    >
      {/* Subtle Background Geometry */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="420" fill="none" stroke="#D8CBD8" strokeWidth="0.75" />
          <circle cx="50%" cy="50%" r="560" fill="none" stroke="#30202D" strokeWidth="0.5" strokeDasharray="8 8" />
        </svg>
      </div>

      {/* Top Header & Scroll-Driven Progress Bar */}
      <div ref={headerRef} className="max-w-4xl mx-auto text-center space-y-2 relative z-10">
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-rose font-bold">
            ATELIER METALLURGY & CRAFT
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-light text-aubergine tracking-tight">
          THE CRAFT
        </h2>
        <p className="text-xs md:text-sm font-serif text-muted max-w-xl mx-auto italic">
          From raw Fairmined mineral grains to cold-forged 18K talons — an unbroken dialogue of ancient goldsmithing.
        </p>
      </div>

      {/* Step Navigation Pill Strip with Scroll Sync */}
      <div
        ref={pillNavRef}
        className="max-w-4xl mx-auto flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 no-scrollbar relative z-10 w-full"
      >
        {CRAFT_STEPS.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => handleStepClick(idx)}
            className={`px-4 py-2 rounded-full text-[10px] font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
              activeStepIdx === idx
                ? 'bg-aubergine text-porcelain shadow-lg font-bold scale-105 border-transparent'
                : 'border border-border text-muted hover:border-aubergine hover:text-aubergine bg-porcelain/60 backdrop-blur-md'
            }`}
          >
            <span>0{idx + 1}</span>
            <span>{step.stage}</span>
          </button>
        ))}
      </div>

      {/* Active Craft Step Interactive Exhibition View */}
      <div className="max-w-6xl mx-auto w-full relative z-10 flex-1 flex items-center my-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-center bg-porcelain/90 rounded-2xl p-6 md:p-10 border border-champagne shadow-2xl"
          >
            {/* Left 6 Cols: Dual Photography Composition */}
            <div className="lg:col-span-6 relative">
              <div className="w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-xl overflow-hidden shadow-2xl border border-champagne/60 relative bg-pearl">
                <img
                  src={activeStep.image}
                  alt={activeStep.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-porcelain/95 rounded-full text-[9px] font-mono tracking-widest text-aubergine font-bold uppercase border border-border flex items-center gap-1.5 shadow-sm">
                  <Sparkles size={11} className="text-lime" />
                  <span>{activeStep.stage}</span>
                </div>
              </div>

              {/* Overlapping Secondary Detail Thumbnail */}
              <div className="absolute -bottom-4 -right-4 w-28 md:w-40 h-28 md:h-40 rounded-lg overflow-hidden shadow-2xl border-2 border-porcelain bg-pearl hidden sm:block">
                <img
                  src={activeStep.secondaryImage}
                  alt="Detail"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right 6 Cols: Technical Specs & Philosophy */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-rose uppercase font-bold">
                  {activeStep.stage}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-aubergine mt-0.5">
                  {activeStep.title}
                </h3>
                <p className="text-xs font-serif text-muted mt-0.5 italic">
                  {activeStep.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-aubergine/85 font-sans leading-relaxed">
                {activeStep.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-3 gap-2.5 p-3 bg-pearl/90 rounded-xl border border-champagne/50 text-xs font-mono">
                {activeStep.technicalSpecs.map((spec, i) => (
                  <div key={i} className="space-y-0.5">
                    <span className="text-[7.5px] text-muted uppercase tracking-wider block truncate">
                      {spec.label}
                    </span>
                    <span className="text-aubergine font-bold text-[10px] sm:text-[11px] block truncate">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="border-l-2 border-rose pl-3 py-0.5">
                <p className="text-xs sm:text-sm font-serif italic text-aubergine line-clamp-2">
                  {activeStep.quote}
                </p>
                <span className="text-[8.5px] font-mono text-muted tracking-widest uppercase block mt-0.5">
                  ATELIER ARCHIVE • {activeStep.coordinates}
                </span>
              </div>

              {/* Step indicator footer */}
              <div className="pt-2 flex items-center justify-between border-t border-border/30">
                <span className="text-[9px] font-mono text-muted uppercase">
                  SCROLL WHEEL DRIVES METALLURGY TIMELINE
                </span>

                <button
                  onClick={() => handleStepClick(activeStepIdx < CRAFT_STEPS.length - 1 ? activeStepIdx + 1 : 0)}
                  className="px-4 py-1.5 rounded-full bg-aubergine text-porcelain text-[9px] font-mono tracking-widest uppercase hover:bg-rose transition-colors flex items-center gap-1.5 font-semibold"
                >
                  <span>NEXT STAGE</span>
                  <ArrowRight size={11} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Timeline Indicator */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex items-center justify-between text-[9px] font-mono text-muted/70 uppercase">
        <span>RAW MINERALS</span>
        <div className="flex-1 mx-6 h-0.5 bg-aubergine/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-rose transition-all duration-300"
            style={{ width: `${((activeStepIdx + 1) / CRAFT_STEPS.length) * 100}%` }}
          />
        </div>
        <span>LIVING HEIRLOOM</span>
      </div>
    </section>
  );
};
