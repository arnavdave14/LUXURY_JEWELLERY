import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Heart, Menu, X, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { scrollToTarget } from '../../utils/motion';

export const EditorialNav: React.FC = () => {
  const {
    wishlist,
    setIsWishlistOpen,
    setIsSearchOpen,
    isMenuOpen,
    setIsMenuOpen,
    setIsConciergeOpen,
    soundEnabled,
    setSoundEnabled
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'COLLECTIONS', target: '#collections', previewImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=80', subtitle: 'Emeralds & Solitaires' },
    { label: 'JEWELLERY', target: '#horizontal-showcase', previewImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80', subtitle: 'The Full Universe' },
    { label: 'THE FILM', target: '#film-sequence', previewImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=500&q=80', subtitle: '300-Frame Sequence' },
    { label: 'CRAFT', target: '#craft-section', previewImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=80', subtitle: 'Atelier Metallurgy' },
    { label: 'THE MAISON', target: '#the-house', previewImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=500&q=80', subtitle: 'Place Vendôme Heritage' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    scrollToTarget(target);
    setHoveredLink(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setPreviewPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <header
        onMouseMove={handleMouseMove}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-none ${
          isScrolled ? 'pt-3' : 'pt-5 md:pt-7'
        }`}
      >
        <div className="max-w-[1720px] mx-auto px-4 md:px-10 flex items-center justify-between pointer-events-auto">
          
          {/* Left: Brand Identity Cylinder Capsule */}
          <div className="flex items-center">
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-porcelain/90 backdrop-blur-md border border-champagne/70 shadow-sm hover:shadow-md hover:border-rose/50 transition-all text-aubergine"
              aria-label="Aurelia Home"
            >
              <span className="text-lg md:text-xl font-light tracking-[0.3em] font-display">AURELIA</span>
              <span className="w-1 h-1 rounded-full bg-rose hidden sm:inline-block" />
              <span className="hidden sm:inline-block text-[9px] font-mono tracking-widest text-muted uppercase">
                HAUTE JOAILLERIE
              </span>
            </a>
          </div>

          {/* Center: Editorial Nav Links Cylinder Capsule */}
          <nav
            className={`hidden lg:flex items-center gap-8 px-8 py-2.5 rounded-full bg-porcelain/90 backdrop-blur-md border border-champagne/70 shadow-sm transition-all duration-300 ${
              isScrolled ? 'scale-95 shadow-md' : ''
            }`}
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.target}
                onClick={(e) => handleLinkClick(e, link.target)}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative text-[11px] font-mono tracking-[0.2em] text-aubergine/80 hover:text-aubergine uppercase transition-colors duration-200 py-1"
              >
                {link.label}
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-rose"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right: Distinct Cylinder Action Capsules */}
          <div className="flex items-center gap-2 md:gap-2.5">
            
            {/* Sound Toggle Capsule */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-porcelain/90 backdrop-blur-md border border-champagne/70 text-aubergine hover:border-rose hover:text-rose transition-all shadow-sm"
              aria-label={soundEnabled ? 'Mute sound' : 'Enable ambient sound'}
              title={soundEnabled ? 'Ambient sound active' : 'Ambient sound off'}
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {/* Search Capsule */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-porcelain/90 backdrop-blur-md border border-champagne/70 text-aubergine hover:border-rose hover:text-rose transition-all shadow-sm"
              aria-label="Open search"
            >
              <Search size={15} strokeWidth={1.75} />
              <span className="hidden md:inline text-[10px] font-mono tracking-widest uppercase font-semibold">SEARCH</span>
            </button>

            {/* Private Dossier Capsule */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-porcelain/90 backdrop-blur-md border border-champagne/70 text-aubergine hover:border-rose hover:text-rose transition-all shadow-sm"
              aria-label={`Saved Dossier (${wishlist.length} creations)`}
              title="Saved Creations Dossier"
            >
              <Heart size={15} strokeWidth={1.75} className={wishlist.length > 0 ? 'fill-rose text-rose' : ''} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose text-porcelain text-[8px] font-mono flex items-center justify-center rounded-full font-bold shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Inquire Salon Capsule */}
            <button
              onClick={() => setIsConciergeOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-aubergine text-porcelain hover:bg-rose transition-colors duration-300 shadow-sm border border-aubergine"
              aria-label="Book Private Salon Appointment"
            >
              <Sparkles size={12} className="text-lime" />
              <span className="text-[10px] font-mono tracking-widest font-semibold uppercase whitespace-nowrap">
                INQUIRE SALON
              </span>
            </button>

            {/* Mobile / Full Menu Trigger Capsule */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-porcelain/90 backdrop-blur-md border border-champagne/70 text-aubergine hover:border-rose hover:text-rose transition-all shadow-sm"
              aria-label="Toggle full editorial menu"
            >
              {isMenuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Hover Image Preview */}
      <AnimatePresence>
        {hoveredLink && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.2 }}
            className="fixed pointer-events-none z-40 hidden lg:block"
            style={{
              left: `${previewPos.x + 20}px`,
              top: `${previewPos.y + 25}px`,
            }}
          >
            {(() => {
              const active = navLinks.find((l) => l.label === hoveredLink);
              if (!active) return null;
              return (
                <div className="p-2 bg-porcelain/95 rounded-xl shadow-xl border border-champagne/60 w-48 overflow-hidden">
                  <div className="w-full h-28 overflow-hidden rounded-lg mb-2 relative bg-pearl">
                    <img
                      src={active.previewImage}
                      alt={active.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-aubergine/80 text-porcelain text-[8px] font-mono tracking-widest rounded">
                      PREVIEW
                    </div>
                  </div>
                  <div className="text-[10px] font-mono tracking-widest font-bold text-aubergine uppercase">
                    {active.label}
                  </div>
                  <div className="text-[9px] font-mono text-muted">
                    {active.subtitle}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
