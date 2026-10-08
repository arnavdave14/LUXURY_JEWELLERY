import React, { useEffect } from 'react';
import { ShopProvider } from './context/ShopContext';
import { initSmoothScroll } from './utils/motion';
import { EditorialNav } from './components/Navigation/EditorialNav';
import { MenuOverlay } from './components/Navigation/MenuOverlay';
import { SearchOverlay } from './components/Navigation/SearchOverlay';
import { WishlistDrawer } from './components/Shop/WishlistDrawer';
import { ProductExhibitionModal } from './components/Shop/ProductExhibitionModal';
import { ConciergeModal } from './components/Shop/ConciergeModal';
import { ToastContainer } from './components/UI/ToastContainer';
import { CustomCursor } from './components/UI/CustomCursor';

// Cinematic Scenes (Continuous Visual Canvas)
import { HeroScene } from './sections/HeroScene';
import { FluidPortalScene } from './sections/FluidPortalScene';
import { CollectionScene } from './sections/CollectionScene';
import { HorizontalShowcase } from './sections/HorizontalShowcase';
import { FilmSequenceScene } from './sections/FilmSequenceScene';
import { CraftScene } from './sections/CraftScene';
import { KineticEditorialMarquee } from './components/common/KineticEditorialMarquee';
import { CampaignScene } from './sections/CampaignScene';
import { HouseJournalScene } from './sections/HouseJournalScene';
import { FinalScene } from './sections/FinalScene';

const MainLayout: React.FC = () => {
  useEffect(() => {
    // Initialize native smooth scroll
    const lenis = initSmoothScroll();

    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-porcelain text-aubergine overflow-x-hidden selection:bg-lilac selection:text-aubergine font-sans">
      {/* Film Grain Texture Overlay */}
      <div className="film-grain" />

      {/* Custom Magnetic Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Floating Editorial Navigation */}
      <EditorialNav />

      {/* CONTINUOUS VISUAL CANVAS — 9 CINEMATIC SCENES */}
      <main className="relative w-full">
        {/* Scene 01: Objects of Desire (Hero Pinned Camera Scene) */}
        <HeroScene />

        {/* Scene 02: Wear The Unexpected (Section-Breaking Multi-Layer Parallax) */}
        <FluidPortalScene />

        {/* Scene 03: Editorial Collection Universe (Asymmetrical Floating Objects) */}
        <CollectionScene />

        {/* Scene 04: Pinned Horizontal Panorama (Scale Contrast & Typography Choreography) */}
        <HorizontalShowcase />

        {/* Scene 05: Scroll-Controlled Jewellery Film (8K Canvas Frame Sequence Engine) */}
        <FilmSequenceScene />

        {/* Scene 06: Tactile Craftsmanship & Metallurgy (Scroll-Driven Tabs) */}
        <CraftScene />

        {/* ULTRA-UNIQUE VELOCITY-DRIVEN KINETIC COUTURE MARQUEE */}
        <KineticEditorialMarquee />

        {/* Scene 07: High-Fashion Campaign (Real Human Photography & Crossed Typography) */}
        <CampaignScene />

        {/* Scene 08: The House & Curated Journal (Ateliers, Mineralogy Essays, Salon) */}
        <HouseJournalScene />

        {/* Scene 09: See You In Another Light (Cinematic Credits & Final Gemstone Drift) */}
        <FinalScene />
      </main>

      {/* INTERACTIVE DRAWERS & MODALS */}
      <MenuOverlay />
      <SearchOverlay />
      <WishlistDrawer />
      <ProductExhibitionModal />
      <ConciergeModal />
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
};

export default App;
