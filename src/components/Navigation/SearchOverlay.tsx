import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openExhibition } = useShop();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const categories = ['ALL', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Emerald', 'Diamond', '18K Gold'];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesQuery =
      query.trim() === '' ||
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.collection.toLowerCase().includes(query.toLowerCase()) ||
      product.metal.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.carat.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      activeCategory === 'ALL' ||
      product.category.toLowerCase() === activeCategory.toLowerCase() ||
      product.name.toLowerCase().includes(activeCategory.toLowerCase()) ||
      product.metal.toLowerCase().includes(activeCategory.toLowerCase());

    return matchesQuery && matchesCategory;
  });

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-porcelain/98 backdrop-blur-lg flex flex-col p-6 md:p-14 overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-border/40 pb-6 max-w-6xl mx-auto w-full">
            <div className="flex items-center gap-3">
              <Sparkles size={16} className="text-rose" />
              <span className="text-[11px] font-mono tracking-widest text-aubergine uppercase font-bold">
                HAUTE JOAILLERIE CURATED SEARCH
              </span>
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-aubergine hover:text-porcelain transition-all"
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Input Box */}
          <div className="max-w-4xl mx-auto w-full my-8">
            <div className="relative flex items-center border-b-2 border-aubergine/40 focus-within:border-aubergine transition-colors pb-3">
              <Search size={28} className="text-aubergine/40 mr-4" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Solitaire, Emerald, 18K Gold, Choker, Carats..."
                className="w-full bg-transparent text-2xl md:text-4xl font-display text-aubergine placeholder:text-muted/40 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs font-mono text-muted uppercase hover:text-aubergine ml-2"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Quick Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
              <span className="text-[9px] font-mono text-muted uppercase tracking-wider mr-2 flex items-center gap-1">
                <Filter size={10} /> QUICK FILTERS:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] font-mono tracking-wider uppercase px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-aubergine text-porcelain font-semibold'
                      : 'border border-border text-muted hover:border-aubergine hover:text-aubergine'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results Grid */}
          <div className="max-w-6xl mx-auto w-full flex-1">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
                {filteredProducts.length} OBJECT{filteredProducts.length !== 1 ? 'S' : ''} DISCOVERED
              </span>
              <span className="text-[9px] font-mono text-muted/60">PRESS ESC TO CLOSE</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <p className="text-xl font-serif text-aubergine">No jewels match your specific search criteria.</p>
                <p className="text-xs font-mono text-muted">Try querying “Emerald”, “Solitaire”, or “Gold”.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-pearl/60 border border-champagne/40 rounded-lg p-5 flex flex-col justify-between hover:shadow-lg hover:border-rose/40 transition-all duration-300"
                  >
                    <div>
                      <div
                        onClick={() => {
                          setIsSearchOpen(false);
                          openExhibition(product);
                        }}
                        className="w-full h-56 overflow-hidden rounded mb-4 cursor-pointer bg-porcelain relative"
                      >
                        <img
                          src={product.heroImage}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.badge && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-aubergine text-porcelain text-[8px] font-mono tracking-widest uppercase rounded">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline justify-between">
                        <span className="text-[9px] font-mono tracking-widest text-rose uppercase">
                          {product.collection}
                        </span>
                        <span className="text-[9px] font-mono text-muted">{product.carat}</span>
                      </div>

                      <h3
                        onClick={() => {
                          setIsSearchOpen(false);
                          openExhibition(product);
                        }}
                        className="text-xl font-display text-aubergine group-hover:text-rose transition-colors cursor-pointer mt-1"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs font-mono text-muted line-clamp-2 mt-1">
                        {product.subtitle}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-muted tracking-wider">
                        {product.metal.split('&')[0]}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsSearchOpen(false);
                            openExhibition(product);
                          }}
                          className="text-[10px] font-mono tracking-widest text-aubergine hover:text-rose uppercase font-semibold flex items-center gap-1"
                        >
                          EXHIBIT <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
