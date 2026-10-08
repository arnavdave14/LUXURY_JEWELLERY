import React, { useEffect, useRef } from 'react';
import { isTouchDevice } from '../../utils/motion';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const facetRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isTouchDevice()) return;

    let mouseX = -100;
    let mouseY = -100;
    let currX = -100;
    let currY = -100;
    let rafId: number;
    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (cursorRef.current) cursorRef.current.style.opacity = '1';
      }

      // Check hover targets lightly without React state re-renders
      const target = e.target as HTMLElement | null;
      if (!target || !reticleRef.current || !facetRef.current) return;

      const closestProduct = target.closest('[data-cursor-product]');
      const closestImage = target.closest('img, canvas');
      const closestLink = target.closest('a, button, input, select');

      if (closestProduct) {
        const title = closestProduct.getAttribute('data-cursor-product') || 'EXHIBIT';
        reticleRef.current.style.width = '130px';
        reticleRef.current.style.height = '36px';
        reticleRef.current.style.borderRadius = '18px';
        reticleRef.current.style.borderColor = 'var(--color-rose)';
        reticleRef.current.style.backgroundColor = 'rgba(48, 32, 45, 0.92)';
        reticleRef.current.style.backdropFilter = 'blur(4px)';
        reticleRef.current.style.transform = 'rotate(0deg)';
        facetRef.current.style.opacity = '0';
        if (labelRef.current) {
          labelRef.current.innerText = title;
          labelRef.current.style.color = '#F5F1E8';
          labelRef.current.style.display = 'block';
        }
      } else if (closestImage) {
        reticleRef.current.style.width = '52px';
        reticleRef.current.style.height = '52px';
        reticleRef.current.style.borderRadius = '50%';
        reticleRef.current.style.borderColor = 'var(--color-rose)';
        reticleRef.current.style.backgroundColor = 'rgba(231, 215, 193, 0.25)';
        reticleRef.current.style.backdropFilter = 'none';
        reticleRef.current.style.transform = 'rotate(45deg)';
        facetRef.current.style.opacity = '1';
        facetRef.current.style.transform = 'scale(1.2) rotate(45deg)';
        if (labelRef.current) labelRef.current.style.display = 'none';
      } else if (closestLink) {
        reticleRef.current.style.width = '38px';
        reticleRef.current.style.height = '38px';
        reticleRef.current.style.borderRadius = '8px';
        reticleRef.current.style.borderColor = 'var(--color-rose)';
        reticleRef.current.style.backgroundColor = 'transparent';
        reticleRef.current.style.backdropFilter = 'none';
        reticleRef.current.style.transform = 'rotate(45deg)';
        facetRef.current.style.opacity = '1';
        facetRef.current.style.transform = 'scale(1) rotate(0deg)';
        if (labelRef.current) labelRef.current.style.display = 'none';
      } else {
        reticleRef.current.style.width = '24px';
        reticleRef.current.style.height = '24px';
        reticleRef.current.style.borderRadius = '4px';
        reticleRef.current.style.borderColor = 'rgba(48, 32, 45, 0.45)';
        reticleRef.current.style.backgroundColor = 'transparent';
        reticleRef.current.style.backdropFilter = 'none';
        reticleRef.current.style.transform = 'rotate(45deg)';
        facetRef.current.style.opacity = '1';
        facetRef.current.style.transform = 'scale(1) rotate(0deg)';
        if (labelRef.current) labelRef.current.style.display = 'none';
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible = true;
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
    };

    // Smooth physics loop with zero React re-render overhead
    const render = () => {
      currX += (mouseX - currX) * 0.25;
      currY += (mouseY - currY) * 0.25;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currX}px, ${currY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (typeof window !== 'undefined' && isTouchDevice()) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[10000] opacity-0 will-change-transform flex items-center justify-center"
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    >
      {/* Precision Haute Diamond Gem Facet Reticle */}
      <div
        ref={reticleRef}
        className="w-6 h-6 border border-aubergine/50 flex items-center justify-center transition-all duration-300 ease-out relative"
        style={{ transform: 'rotate(45deg)' }}
      >
        {/* Micro 4-Corner Crosshair Ticks */}
        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-rose" />
        <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-rose" />
        <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-rose" />
        <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-rose" />

        {/* Center Optical Sparkle Dot */}
        <div
          ref={facetRef}
          className="w-1.5 h-1.5 bg-rose transition-transform duration-300 pointer-events-none"
          style={{ transform: 'rotate(45deg)' }}
        />

        {/* Dynamic Product Exhibition Label */}
        <span
          ref={labelRef}
          className="text-[9px] font-mono tracking-widest uppercase font-bold px-2 truncate hidden pointer-events-none"
        />
      </div>
    </div>
  );
};
