import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  // Configure GSAP defaults for maximum buttery performance
  gsap.config({
    autoSleep: 60,
    force3D: true,
  });
  gsap.ticker.lagSmoothing(500, 33);
}

export { gsap, ScrollTrigger };

export const initSmoothScroll = () => {
  if (typeof window === 'undefined') return null;

  // Configure native smooth scrolling with ScrollTrigger
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
    ignoreMobileResize: true,
  });

  return {
    destroy: () => {},
  };
};

export const getLenis = () => null;

export const scrollToTarget = (target: string | HTMLElement, offset: number = 0) => {
  if (typeof window === 'undefined') return;
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }
};

export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};
