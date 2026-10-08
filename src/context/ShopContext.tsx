import React, { createContext, useContext, useState } from 'react';
import type { Product } from '../data/products';
import { PRODUCTS } from '../data/products';

interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type?: 'success' | 'info' | 'wishlist';
}

interface ShopContextType {
  wishlist: string[];
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  isMenuOpen: boolean;
  isDebugOpen: boolean;
  isExhibitionOpen: boolean;
  isConciergeOpen: boolean;
  selectedProduct: Product | null;
  soundEnabled: boolean;
  searchQuery: string;
  
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  setIsWishlistOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsMenuOpen: (open: boolean) => void;
  setIsDebugOpen: (open: boolean) => void;
  setIsExhibitionOpen: (open: boolean) => void;
  setIsConciergeOpen: (open: boolean) => void;
  setSelectedProduct: (product: Product | null) => void;
  openExhibition: (product: Product) => void;
  openConciergeWithProduct: (product?: Product) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setSearchQuery: (query: string) => void;
  
  toasts: ToastMessage[];
  addToast: (title: string, description: string, type?: 'success' | 'info' | 'wishlist') => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<string[]>(['aurelia-solitaire', 'celeste-pave-choker']);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDebugOpen, setIsDebugOpen] = useState(false);
  const [isExhibitionOpen, setIsExhibitionOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, description: string, type: 'success' | 'info' | 'wishlist' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const prod = PRODUCTS.find((p) => p.id === productId);
      if (exists) {
        addToast('CURATION ARCHIVE', `${prod?.name || 'Creation'} removed from saved dossier.`, 'wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('CURATION ARCHIVE', `${prod?.name || 'Creation'} saved to private dossier.`, 'wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const openExhibition = (product: Product) => {
    setSelectedProduct(product);
    setIsExhibitionOpen(true);
  };

  const openConciergeWithProduct = (product?: Product) => {
    if (product) {
      setSelectedProduct(product);
    }
    setIsExhibitionOpen(false);
    setIsConciergeOpen(true);
  };

  return (
    <ShopContext.Provider
      value={{
        wishlist,
        isWishlistOpen,
        isSearchOpen,
        isMenuOpen,
        isDebugOpen,
        isExhibitionOpen,
        isConciergeOpen,
        selectedProduct,
        soundEnabled,
        searchQuery,
        toggleWishlist,
        isInWishlist,
        setIsWishlistOpen,
        setIsSearchOpen,
        setIsMenuOpen,
        setIsDebugOpen,
        setIsExhibitionOpen,
        setIsConciergeOpen,
        setSelectedProduct,
        openExhibition,
        openConciergeWithProduct,
        setSoundEnabled,
        setSearchQuery,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
