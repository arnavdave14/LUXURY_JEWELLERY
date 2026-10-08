import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Sparkles, Ruler } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ProductExhibitionModal: React.FC = () => {
  const {
    isExhibitionOpen,
    setIsExhibitionOpen,
    selectedProduct,
    toggleWishlist,
    isInWishlist,
    openConciergeWithProduct
  } = useShop();

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('52 (EU)');
  const [selectedFinish, setSelectedFinish] = useState('18K Recycled Yellow Gold');
  const [engravingText, setEngravingText] = useState('');

  if (!selectedProduct) return null;

  const ringSizes = ['50 (EU)', '52 (EU)', '54 (EU)', '56 (EU)', 'Bespoke Sizing'];
  const goldFinishes = [
    '18K Recycled Yellow Gold',
    '18K Rose Gold Atelier',
    '18K White Gold & Platinum'
  ];

  const galleryImages = [
    selectedProduct.heroImage,
    selectedProduct.macroImage,
    selectedProduct.modelImage,
    selectedProduct.craftImage,
    ...(selectedProduct.gallery || [])
  ].filter(Boolean);

  const handleInquire = () => {
    openConciergeWithProduct(selectedProduct);
  };

  return (
    <AnimatePresence>
      {isExhibitionOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-porcelain/98 overflow-y-auto no-scrollbar flex flex-col"
        >
          {/* Top Exhibition Navigation */}
          <div className="sticky top-0 z-30 bg-porcelain/95 border-b border-border/40 px-6 md:px-14 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-widest text-rose uppercase font-bold">
                DIGITAL EXHIBITION // {selectedProduct.collection}
              </span>
              <span className="hidden sm:inline text-xs font-mono text-muted/60">• ARCHIVE REF: {selectedProduct.sku}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-champagne/30 transition-colors"
                aria-label="Save to archive dossier"
              >
                <Heart
                  size={18}
                  className={isInWishlist(selectedProduct.id) ? 'fill-rose text-rose' : 'text-aubergine'}
                />
              </button>

              <button
                onClick={() => setIsExhibitionOpen(false)}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-aubergine hover:text-porcelain transition-all"
                aria-label="Close exhibition"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Main Exhibition Body */}
          <div className="max-w-[1500px] mx-auto w-full px-6 md:px-14 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 flex-1">
            
            {/* Left 7 Cols: Multi-Angle Imagery */}
            <div className="lg:col-span-7 space-y-6">
              <div className="w-full h-[450px] md:h-[620px] rounded-xl overflow-hidden bg-pearl relative border border-champagne/50 shadow-inner group">
                <img
                  src={galleryImages[selectedImageIdx] || selectedProduct.heroImage}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-porcelain/90 rounded-full text-[9px] font-mono tracking-widest text-aubergine uppercase border border-border">
                  PLATE 0{selectedImageIdx + 1} OF 0{galleryImages.length}
                </div>
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-porcelain/90 rounded-lg border border-border flex items-center justify-between text-[10px] font-mono text-muted">
                  <span>DIMENSIONS: {selectedProduct.dimensions}</span>
                  <span className="text-aubergine font-bold">100% ETHICALLY ASSAYED</span>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-24 h-24 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImageIdx === idx
                        ? 'border-rose scale-105 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Editorial Quote Banner */}
              <div className="p-6 md:p-8 bg-pearl/80 border border-champagne rounded-xl relative overflow-hidden">
                <p className="text-base md:text-xl font-serif italic text-aubergine/90">
                  {selectedProduct.editorialQuote}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-mono tracking-widest text-rose uppercase font-semibold">
                  <span>MAISON AURELIA CURATORIAL NOTES</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Exhibition Dossier */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono tracking-[0.25em] text-rose uppercase font-bold">
                    {selectedProduct.collection} ARCHIVE
                  </span>
                  <h1 className="text-3xl md:text-5xl font-display text-aubergine mt-1">
                    {selectedProduct.name}
                  </h1>
                  <p className="text-sm font-serif text-muted mt-2">
                    {selectedProduct.subtitle}
                  </p>
                </div>

                <div className="py-3 border-y border-border/40 flex items-baseline justify-between">
                  <span className="text-xs font-mono tracking-widest text-aubergine uppercase font-bold">
                    HAUTE JOAILLERIE PIECE // BESPOKE COMMISSIONS
                  </span>
                  <span className="text-xs font-mono text-sage font-semibold uppercase">
                    ● Atelier Available
                  </span>
                </div>

                <p className="text-sm text-aubergine/80 font-sans leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-pearl/60 rounded-lg border border-champagne/40 text-xs font-mono">
                  <div>
                    <span className="text-muted/60 uppercase text-[9px]">CARAT WEIGHT</span>
                    <p className="text-aubergine font-bold mt-0.5">{selectedProduct.carat}</p>
                  </div>
                  <div>
                    <span className="text-muted/60 uppercase text-[9px]">PRECIOUS METAL</span>
                    <p className="text-aubergine font-bold mt-0.5">{selectedProduct.metal}</p>
                  </div>
                  <div>
                    <span className="text-muted/60 uppercase text-[9px]">ORIGIN ATELIER</span>
                    <p className="text-aubergine font-bold mt-0.5">{selectedProduct.origin}</p>
                  </div>
                  <div>
                    <span className="text-muted/60 uppercase text-[9px]">CERTIFICATION</span>
                    <p className="text-aubergine font-bold mt-0.5">{selectedProduct.certifications[0]}</p>
                  </div>
                </div>

                {/* Sizing & Finishes */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono uppercase mb-2">
                      <span className="text-aubergine font-semibold">SIZE SPECIFICATION:</span>
                      <button
                        onClick={handleInquire}
                        className="text-rose text-[10px] hover:underline flex items-center gap-1"
                      >
                        <Ruler size={12} /> Bespoke Sizing Advisory
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {ringSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-colors ${
                            selectedSize === size
                              ? 'bg-aubergine text-porcelain font-bold'
                              : 'border border-border hover:border-aubergine text-aubergine'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-mono uppercase text-aubergine font-semibold mb-2">
                      ATELIER ALLOY SELECTION:
                    </span>
                    <div className="space-y-2">
                      {goldFinishes.map((finish) => (
                        <button
                          key={finish}
                          onClick={() => setSelectedFinish(finish)}
                          className={`w-full text-left px-4 py-2 rounded text-xs font-mono flex items-center justify-between border transition-all ${
                            selectedFinish === finish
                              ? 'border-aubergine bg-pearl font-bold'
                              : 'border-border/60 hover:border-border text-muted'
                          }`}
                        >
                          <span>{finish}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Micro Engraving Input */}
                  <div>
                    <span className="block text-xs font-mono uppercase text-aubergine font-semibold mb-1">
                      BESPOKE ATELIER INSCRIPTION (OPTIONAL):
                    </span>
                    <input
                      type="text"
                      maxLength={24}
                      value={engravingText}
                      onChange={(e) => setEngravingText(e.target.value)}
                      placeholder="e.g. A.V. 2026 // FOREVER"
                      className="w-full px-3 py-2 bg-transparent border border-border rounded text-xs font-mono uppercase tracking-widest focus:outline-none focus:border-aubergine"
                    />
                  </div>
                </div>

                {/* Craftsmanship Checklist */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-muted">
                    INDIVIDUAL CRAFT SIGNATURES:
                  </span>
                  <ul className="space-y-1 text-xs font-sans text-aubergine/80">
                    {selectedProduct.craftDetails.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose font-bold">✧</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-6 border-t border-border/40">
                <button
                  onClick={handleInquire}
                  className="w-full py-4 rounded-full bg-aubergine text-porcelain text-xs font-mono tracking-[0.2em] font-bold uppercase hover:bg-rose transition-colors duration-300 flex items-center justify-center gap-2 shadow-xl"
                >
                  <Sparkles size={14} className="text-lime" />
                  <span>REQUEST PRIVATE SALON VIEWING // INQUIRE</span>
                </button>

                <button
                  onClick={() => setIsExhibitionOpen(false)}
                  className="w-full py-3 rounded-full border border-aubergine/30 hover:border-aubergine text-aubergine text-xs font-mono tracking-widest uppercase transition-colors"
                >
                  CONTINUE EXPLORING EXHIBITION
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
