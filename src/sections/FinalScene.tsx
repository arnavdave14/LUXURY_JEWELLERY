import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Send, Check } from 'lucide-react';
import { gsap, scrollToTarget } from '../utils/motion';
import { useShop } from '../context/ShopContext';

export const FinalScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const driftingJewelRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);

  const { addToast, setIsConciergeOpen } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const formBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const driftingJewel = driftingJewelRef.current;
    const statement = statementRef.current;
    const formBox = formBoxRef.current;

    if (!container || !driftingJewel) return;

    const ctx = gsap.context(() => {
      // Drifting jewel entrance + parallax drift
      gsap.fromTo(
        driftingJewel,
        { opacity: 0, y: 100, scale: 0.9 },
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

      gsap.to(driftingJewel, {
        y: -160,
        x: 60,
        scale: 1.15,
        rotation: 6,
        ease: 'none',
        scrollTrigger: {
          id: 'final-drifting-jewel',
          trigger: container,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1.4,
        },
      });

      if (statement) {
        gsap.fromTo(
          statement,
          { y: 80, opacity: 0.1 },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              id: 'final-statement-text',
              trigger: container,
              start: 'top 75%',
              end: 'center 40%',
              scrub: 1,
            },
          }
        );
      }

      if (formBox) {
        gsap.fromTo(
          formBox,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 70%',
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    addToast('PRIVATE DISPATCH REGISTERED', 'You will receive private notices for new numbered editions.', 'success');
  };

  return (
    <footer
      id="final-credits"
      ref={containerRef}
      className="relative min-h-screen w-full bg-porcelain overflow-hidden py-24 md:py-36 px-6 md:px-14 flex flex-col justify-between"
    >
      {/* Background SVG Horizon Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#30202D" strokeWidth="0.5" strokeDasharray="6 12" />
          <circle cx="50%" cy="50%" r="300" fill="none" stroke="#A85F72" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Top Tag & Back to Apex */}
      <div className="relative z-20 flex items-center justify-between border-b border-border/40 pb-6">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-rose font-bold">
            FIN DU FILM // EPILOGUE
          </span>
        </div>

        <button
          onClick={() => scrollToTarget('#hero')}
          className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-aubergine hover:text-rose uppercase font-semibold transition-colors"
          aria-label="Return to beginning of film"
        >
          <span>RETURN TO TOP</span>
          <ArrowUp size={14} className="animate-bounce" />
        </button>
      </div>

      {/* Center Cinematic Statement & Drifting Final Jewel */}
      <div className="relative z-10 my-16 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left 8 Cols: Huge Movie Credits Statement */}
        <div className="lg:col-span-8 space-y-6">
          <h2
            ref={statementRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-light text-aubergine tracking-tight leading-[0.9]"
            
          >
            SEE YOU<br />
            IN ANOTHER<br />
            <span className="italic font-normal text-aubergine/80">LIGHT.</span>
          </h2>

          <p className="text-sm md:text-base font-serif text-muted max-w-md italic">
            Each creation is an unrepeatable dialogue between Earth’s deepest geology and human hands.
          </p>

          {/* Private Dispatch Form */}
          <div ref={formBoxRef} className="pt-4 max-w-md">
            <span className="text-[10px] font-mono tracking-widest uppercase text-aubergine font-bold block mb-2">
              ACQUIRE PRIVATE MAISON DISPATCHES:
            </span>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs font-mono text-sage font-bold p-3 bg-pearl rounded border border-champagne">
                <Check size={14} /> REGISTERED IN PARIS SALON LOGS
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patron@domain.com"
                  className="flex-1 px-4 py-3 bg-pearl border border-border rounded-full text-xs font-mono text-aubergine placeholder:text-muted/60 focus:outline-none focus:border-aubergine"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-aubergine text-porcelain text-xs font-mono tracking-widest uppercase hover:bg-rose transition-colors flex items-center gap-1.5"
                >
                  <Send size={12} /> JOIN
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right 4 Cols: Final Drifting Gemstone */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <div
            ref={driftingJewelRef}
            className="w-56 md:w-72 h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl border border-champagne bg-pearl relative group"
            
          >
            <img
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=90"
              alt="Final Gemstone Drift"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-aubergine/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-porcelain text-[10px] font-mono">
              <span className="text-lime uppercase font-bold tracking-widest block text-[9px]">
                SOLITAIRE 0019
              </span>
              <span>18K SOLID GOLD • LIFETIME GUARANTEE</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Minimalist Credits Links */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-between border-t border-border/40 pt-8 gap-6 text-[10px] font-mono tracking-widest uppercase text-muted">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-aubergine font-semibold">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToTarget('#hero'); }} className="hover:text-rose">AURELIA</a>
          <a href="#collections" onClick={(e) => { e.preventDefault(); scrollToTarget('#collections'); }} className="hover:text-rose">COLLECTIONS</a>
          <a href="#the-house" onClick={(e) => { e.preventDefault(); scrollToTarget('#the-house'); }} className="hover:text-rose">THE HOUSE</a>
          <a href="#craft-section" onClick={(e) => { e.preventDefault(); scrollToTarget('#craft-section'); }} className="hover:text-rose">CRAFT</a>
          <button onClick={() => setIsConciergeOpen(true)} className="hover:text-rose uppercase font-bold text-rose">
            SALON CONCIERGE
          </button>
        </div>

        <div className="flex items-center gap-6">
          <span>PARIS • JAIPUR • MILANO</span>
          <span>© MMXXVI MAISON AURELIA</span>
        </div>
      </div>
    </footer>
  );
};
