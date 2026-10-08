import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from '../../utils/motion';
import { SequenceFrameLoader } from './FrameLoader';

interface ScrollImageSequenceProps {
  frameCount: number;
  framePath: string;
  padLength?: number;
  extension?: string;
  fallbackImage?: string;
  canvasWidth?: number;
  canvasHeight?: number;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  objectFit?: 'contain' | 'cover';
  className?: string;
  children?: React.ReactNode;
  onFrameChange?: (index: number, progress: number) => void;
}

export const ScrollImageSequence: React.FC<ScrollImageSequenceProps> = ({
  frameCount,
  framePath,
  padLength = 3,
  extension = '.jpg',
  fallbackImage,
  start = 'top top',
  end = '+=2800',
  scrub = 0.5,
  objectFit = 'contain',
  className = '',
  children,
  onFrameChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<SequenceFrameLoader | null>(null);

  // HUD DOM element refs to prevent React state re-renders on scroll
  const timelineTextRef = useRef<HTMLSpanElement>(null);
  const frameTextRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const bufferTextRef = useRef<HTMLSpanElement>(null);

  const currentFrameRef = useRef<number>(1);
  const isDrawingRef = useRef<boolean>(false);
  const pendingFrameRef = useRef<number | null>(null);

  // Initialize Loader
  useEffect(() => {
    const loader = new SequenceFrameLoader({
      frameCount,
      basePath: framePath,
      padLength,
      extension,
      fallbackImage
    });
    loaderRef.current = loader;

    // Fast preload keyframes
    loader.preloadKeyFrames(4).then(() => {
      // Background preload remaining frames
      loader.startBackgroundPreload((loaded, total) => {
        if (bufferTextRef.current) {
          const pct = Math.round((loaded / total) * 100);
          if (pct >= 100) {
            bufferTextRef.current.style.display = 'none';
          } else {
            bufferTextRef.current.innerText = `BUFF ${pct}%`;
          }
        }
      });
      // Initial draw
      renderFrame(1);
    });

    return () => {
      loader.clearCache();
    };
  }, [frameCount, framePath, padLength, extension, fallbackImage]);

  // High-performance direct canvas draw
  const drawOntoCanvas = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    ctx.clearRect(0, 0, cw, ch);

    const iw = img.naturalWidth || 960;
    const ih = img.naturalHeight || 960;

    let renderW = cw;
    let renderH = ch;
    let offsetX = 0;
    let offsetY = 0;

    if (objectFit === 'contain') {
      const scale = Math.min(cw / iw, ch / ih);
      renderW = iw * scale;
      renderH = ih * scale;
      offsetX = (cw - renderW) / 2;
      offsetY = (ch - renderH) / 2;
    } else {
      const scale = Math.max(cw / iw, ch / ih);
      renderW = iw * scale;
      renderH = ih * scale;
      offsetX = (cw - renderW) / 2;
      offsetY = (ch - renderH) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
  };

  const renderFrame = (frameIndex: number) => {
    pendingFrameRef.current = frameIndex;

    if (isDrawingRef.current) return;
    isDrawingRef.current = true;

    requestAnimationFrame(() => {
      const targetFrame = pendingFrameRef.current || frameIndex;
      currentFrameRef.current = targetFrame;

      const img = loaderRef.current?.getCachedFrame(targetFrame);
      if (img && img.complete && img.naturalWidth > 0) {
        drawOntoCanvas(img);
      } else {
        loaderRef.current?.loadFrame(targetFrame).then((loadedImg) => {
          drawOntoCanvas(loadedImg);
        }).catch(() => null);
      }

      isDrawingRef.current = false;
    });
  };

  // Setup Resize Observer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      // Cap DPR to 1.2 for buttery 120fps performance on integrated/standard laptop GPUs
      const dpr = Math.min(window.devicePixelRatio || 1, 1.2);
      
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'medium';
      }

      renderFrame(currentFrameRef.current);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize, { passive: true });
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  // Connect GSAP ScrollTrigger
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const st = ScrollTrigger.create({
      id: 'scroll-image-sequence-canvas',
      trigger: container,
      pin: true,
      start,
      end,
      scrub: typeof scrub === 'boolean' ? (scrub ? 0.5 : false) : scrub,
      anticipatePin: 1,
      onUpdate: (self) => {
        const frameIndex = Math.round(1 + self.progress * (frameCount - 1));
        const clamped = Math.max(1, Math.min(frameIndex, frameCount));

        // Direct canvas render
        renderFrame(clamped);

        // Update HUD elements directly without React re-render
        if (timelineTextRef.current) {
          timelineTextRef.current.innerText = `SCROLL TIMELINE: ${(self.progress * 100).toFixed(0)}%`;
        }
        if (frameTextRef.current) {
          frameTextRef.current.innerText = `FRAME ${String(clamped).padStart(3, '0')} OF ${frameCount}`;
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${self.progress})`;
        }

        if (onFrameChange) {
          onFrameChange(clamped, self.progress);
        }
      }
    });

    renderFrame(1);

    return () => {
      st.kill();
    };
  }, [frameCount, start, end, scrub, onFrameChange]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden bg-porcelain flex items-center justify-center ${className}`}
      
    >
      {/* Background Soft Aura */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

      {/* Main High-Performance Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain block z-10 gpu-layer"
        style={{ touchAction: 'none' }}
      />

      {/* Overlay Children */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-12">
        {children}
      </div>

      {/* Frame Sequence Metadata HUD */}
      <div className="absolute bottom-6 left-6 md:left-12 z-30 pointer-events-none flex items-center gap-6">
        <div className="flex flex-col gap-1 text-[10px] font-mono tracking-widest text-aubergine/70 uppercase">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            <span ref={timelineTextRef}>SCROLL TIMELINE: 0%</span>
          </div>
          <span ref={frameTextRef} className="text-muted/60 text-[9px]">
            FRAME 001 OF {frameCount}
          </span>
        </div>

        {/* Mini progress bar */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-24 h-1 bg-aubergine/10 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full w-full bg-rose origin-left transform scale-x-0 transition-transform duration-75"
            />
          </div>
          <span ref={bufferTextRef} className="text-[8px] font-mono text-muted/60">
            BUFF 15%
          </span>
        </div>
      </div>
    </div>
  );
};
