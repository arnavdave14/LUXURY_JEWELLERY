import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, Sparkles, Eye } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    openExhibition,
    openConciergeWithProduct
  } = useShop();

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-aubergine/40 z-50"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-porcelain z-50 shadow-2xl flex flex-col justify-between border-l border-border/40"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-border/40 flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-xl md:text-2xl font-display text-aubergine">
                  Private Dossier
                </span>
                <span className="text-xs font-mono text-muted">
                  ({wishlistProducts.length} Saved)
                </span>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-aubergine hover:text-porcelain transition-all"
                aria-label="Close dossier"
              >
                <X size={16} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {wishlistProducts.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mx-auto text-muted">
                    <Heart size={20} />
                  </div>
                  <h4 className="text-xl font-display text-aubergine">No pieces archived yet.</h4>
                  <p className="text-xs font-mono text-muted max-w-xs mx-auto">
                    Save the objects of desire you wish to reserve for private viewings or bespoke inquiries.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {wishlistProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 p-4 bg-pearl/70 rounded-lg border border-champagne/40"
                    >
                      <div
                        onClick={() => {
                          setIsWishlistOpen(false);
                          openExhibition(product);
                        }}
                        className="w-20 h-24 rounded overflow-hidden bg-porcelain shrink-0 cursor-pointer"
                      >
                        <img
                          src={product.heroImage}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h5
                              onClick={() => {
                                setIsWishlistOpen(false);
                                openExhibition(product);
                              }}
                              className="text-base font-display text-aubergine hover:text-rose cursor-pointer transition-colors"
                            >
                              {product.name}
                            </h5>
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className="text-muted/60 hover:text-rose transition-colors p-1"
                              aria-label="Remove from archive"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <p className="text-[10px] font-mono text-muted uppercase">
                            {product.collection} • {product.carat}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/30">
                          <button
                            onClick={() => {
                              setIsWishlistOpen(false);
                              openExhibition(product);
                            }}
                            className="flex items-center gap-1 text-[10px] font-mono text-aubergine hover:text-rose font-bold uppercase"
                          >
                            <Eye size={12} />
                            <span>EXHIBIT</span>
                          </button>

                          <button
                            onClick={() => {
                              setIsWishlistOpen(false);
                              openConciergeWithProduct(product);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1 bg-aubergine text-porcelain text-[10px] font-mono tracking-wider uppercase rounded hover:bg-rose transition-colors"
                          >
                            <Sparkles size={11} className="text-lime" />
                            <span>INQUIRE</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom button */}
            <div className="p-6 md:p-8 border-t border-border/40 bg-pearl/90">
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  openConciergeWithProduct();
                }}
                className="w-full py-3.5 rounded-full bg-aubergine text-porcelain hover:bg-rose text-xs font-mono tracking-widest uppercase transition-all duration-300 font-bold"
              >
                REQUEST SALON VIEWING FOR DOSSIER
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
