import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import type { JournalArticle } from '../data/journal';
import { JOURNAL_ARTICLES } from '../data/journal';
import { useShop } from '../context/ShopContext';
import { gsap } from '../utils/motion';

export const HouseJournalScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ateliersRef = useRef<HTMLDivElement>(null);
  const journalGridRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const { setIsConciergeOpen } = useShop();

  const ateliers = [
    { city: 'PARIS', address: '12 Place Vendôme, 75001 Paris', focus: 'High Metallurgy & Solitaire Settings', coords: '48.8675° N, 2.3294° E' },
    { city: 'JAIPUR', address: 'City Palace Enclave, Jaipur, Rajasthan', focus: 'Muzo Emerald Lapidary & Chasing', coords: '26.9260° N, 75.8236° E' },
    { city: 'MILANO', address: 'Via Monte Napoleone 8, 20121 Milano', focus: 'Brutalist Casting & Tension Engineering', coords: '45.4689° N, 9.1953° E' }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      if (ateliersRef.current) {
        gsap.fromTo(
          ateliersRef.current.children,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ateliersRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      if (journalGridRef.current) {
        gsap.fromTo(
          journalGridRef.current.children,
          { opacity: 0, y: 60, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: journalGridRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bannerRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="the-house" ref={containerRef} className="relative w-full bg-pearl py-24 md:py-36 px-6 md:px-14 border-t border-border/40 overflow-hidden">
      <div className="max-w-[1600px] mx-auto space-y-24">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row items-baseline justify-between gap-6 border-b border-border/40 pb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-rose font-bold">
                THE HOUSE & JOURNAL
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-light text-aubergine tracking-tight mt-2">
              Curated Dialogues & Heritage
            </h2>
          </div>

          <p className="text-sm font-serif text-muted max-w-md italic">
            Essays on mineral physics, historical lapidary techniques, and the slow luxury philosophy that guides Maison Aurelia.
          </p>
        </div>

        {/* Part 1: House Ateliers Grid */}
        <div ref={ateliersRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ateliers.map((atelier) => (
            <div
              key={atelier.city}
              className="p-8 bg-porcelain/80 rounded-2xl border border-champagne shadow-sm hover:shadow-md transition-shadow space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl md:text-3xl font-display text-aubergine">{atelier.city}</span>
                <span className="text-[9px] font-mono text-rose uppercase tracking-widest font-bold">ATELIER</span>
              </div>
              <p className="text-xs font-serif text-aubergine/90">{atelier.address}</p>
              <p className="text-xs font-mono text-muted">{atelier.focus}</p>
              <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[9px] font-mono text-muted">
                <span>{atelier.coords}</span>
                <span className="text-aubergine font-bold uppercase">BY APPOINTMENT</span>
              </div>
            </div>
          ))}
        </div>

        {/* Part 2: Journal Essays Carousel / Grid */}
        <div className="space-y-8">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-mono tracking-widest text-aubergine uppercase font-bold">
              MAISON JOURNAL // VOLUME IV
            </span>
            <span className="text-[10px] font-mono text-muted">SELECT AN ESSAY TO READ</span>
          </div>

          <div ref={journalGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {JOURNAL_ARTICLES.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group bg-porcelain rounded-xl overflow-hidden border border-champagne/60 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-64 overflow-hidden relative">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-porcelain/90 backdrop-blur-sm rounded text-[8px] font-mono tracking-widest uppercase text-aubergine">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <span className="text-[9px] font-mono text-rose tracking-wider uppercase block">
                      {article.issue} • {article.readTime}
                    </span>
                    <h4 className="text-xl md:text-2xl font-display text-aubergine group-hover:text-rose transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-xs font-serif text-muted line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between text-[10px] font-mono text-aubergine font-semibold uppercase">
                  <span>READ COMPLETE ESSAY</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform text-rose" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Salon Invitation Banner */}
        <div ref={bannerRef} className="p-8 md:p-14 bg-porcelain rounded-2xl border border-champagne flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <span className="text-[10px] font-mono tracking-widest text-rose uppercase font-bold">
              PRIVATE SALON AUDIENCES
            </span>
            <h3 className="text-2xl sm:text-4xl font-display text-aubergine">
              Experience the Solitaires in Person
            </h3>
            <p className="text-xs sm:text-sm font-serif text-muted">
              We welcome patrons to private viewings at our Place Vendôme flagship or historic Jaipur pavilion. Champagne and gemological loupes provided.
            </p>
          </div>

          <button
            onClick={() => setIsConciergeOpen(true)}
            className="px-8 py-4 rounded-full bg-aubergine text-porcelain text-xs font-mono tracking-[0.2em] uppercase font-semibold hover:bg-rose transition-colors duration-300 shadow-lg whitespace-nowrap"
          >
            REQUEST SALON APPOINTMENT
          </button>
        </div>

      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-aubergine/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-porcelain rounded-2xl max-w-3xl w-full p-6 md:p-12 border border-champagne shadow-2xl relative max-h-[88vh] overflow-y-auto no-scrollbar space-y-6"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-aubergine hover:text-porcelain transition-all"
                aria-label="Close article"
              >
                <X size={16} />
              </button>

              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-rose uppercase font-bold">
                  {selectedArticle.issue} // {selectedArticle.category}
                </span>
                <h3 className="text-2xl md:text-4xl font-display text-aubergine">
                  {selectedArticle.title}
                </h3>
                <p className="text-xs font-mono text-muted">
                  By {selectedArticle.author} • {selectedArticle.date} • {selectedArticle.readTime}
                </p>
              </div>

              <div className="w-full h-64 rounded-xl overflow-hidden shadow-inner">
                <img
                  src={selectedArticle.coverImage}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 bg-pearl rounded-lg border border-champagne/60 border-l-4 border-l-rose text-sm font-serif italic text-aubergine">
                {selectedArticle.pullQuote}
              </div>

              <div className="space-y-4 text-sm text-aubergine/85 font-sans leading-relaxed">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-border/40 flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted uppercase">MAISON AURELIA ARCHIVE</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2 rounded-full bg-aubergine text-porcelain text-xs font-mono uppercase tracking-wider hover:bg-rose"
                >
                  DONE READING
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
