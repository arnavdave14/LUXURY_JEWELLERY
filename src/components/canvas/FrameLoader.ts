export interface SequenceConfig {
  frameCount: number;
  basePath: string;
  padLength?: number;
  extension?: string;
  fallbackImage?: string;
}

export class SequenceFrameLoader {
  private config: SequenceConfig;
  private imageCache: Map<number, HTMLImageElement> = new Map();
  private loadPromises: Map<number, Promise<HTMLImageElement>> = new Map();
  private isPreloading: boolean = false;
  private onProgressCallback?: (loaded: number, total: number) => void;

  constructor(config: SequenceConfig) {
    this.config = {
      padLength: 3,
      extension: '.jpg',
      ...config
    };
  }

  public getFrameUrl(index: number): string {
    const clampedIndex = Math.max(1, Math.min(index, this.config.frameCount));
    const padded = String(clampedIndex).padStart(this.config.padLength || 3, '0');
    return `${this.config.basePath}${padded}${this.config.extension}`;
  }

  public async loadFrame(index: number): Promise<HTMLImageElement> {
    const clamped = Math.max(1, Math.min(index, this.config.frameCount));
    
    if (this.imageCache.has(clamped)) {
      return this.imageCache.get(clamped)!;
    }

    if (this.loadPromises.has(clamped)) {
      return this.loadPromises.get(clamped)!;
    }

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        this.imageCache.set(clamped, img);
        this.loadPromises.delete(clamped);
        resolve(img);
      };
      img.onerror = () => {
        this.loadPromises.delete(clamped);
        if (this.config.fallbackImage) {
          const fallback = new Image();
          fallback.onload = () => {
            this.imageCache.set(clamped, fallback);
            resolve(fallback);
          };
          fallback.onerror = () => reject(new Error(`Failed to load frame ${clamped}`));
          fallback.src = this.config.fallbackImage;
        } else {
          reject(new Error(`Failed to load frame ${clamped}`));
        }
      };
      img.src = this.getFrameUrl(clamped);
    });

    this.loadPromises.set(clamped, promise);
    return promise;
  }

  public getCachedFrame(index: number): HTMLImageElement | undefined {
    const target = Math.max(1, Math.min(index, this.config.frameCount));
    
    // Direct hit
    if (this.imageCache.has(target)) {
      return this.imageCache.get(target);
    }

    // Closest frame fallback for instant buttery rendering without waiting
    let closestIndex = 1;
    let minDiff = Infinity;

    for (const cachedIdx of this.imageCache.keys()) {
      const diff = Math.abs(cachedIdx - target);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = cachedIdx;
      }
    }

    if (this.imageCache.has(closestIndex)) {
      // Trigger async load of the target frame in the background
      this.loadFrame(target).catch(() => null);
      return this.imageCache.get(closestIndex);
    }

    return undefined;
  }

  public async preloadKeyFrames(step: number = 4): Promise<void> {
    const keyIndices: number[] = [];
    for (let i = 1; i <= this.config.frameCount; i += step) {
      keyIndices.push(i);
    }
    if (!keyIndices.includes(this.config.frameCount)) {
      keyIndices.push(this.config.frameCount);
    }

    // Batch in groups of 8 to prevent network socket congestion
    const batchSize = 8;
    for (let i = 0; i < keyIndices.length; i += batchSize) {
      const batch = keyIndices.slice(i, i + batchSize);
      await Promise.all(batch.map((idx) => this.loadFrame(idx).catch(() => null)));
    }
  }

  public startBackgroundPreload(onProgress?: (loaded: number, total: number) => void): void {
    if (this.isPreloading) return;
    this.isPreloading = true;
    this.onProgressCallback = onProgress;

    const total = this.config.frameCount;
    let currentIdx = 1;

    const loadNextChunk = () => {
      if (currentIdx > total) {
        this.isPreloading = false;
        return;
      }

      // Load 4 frames per idle tick
      const promises = [];
      for (let i = 0; i < 4 && currentIdx <= total; i++) {
        promises.push(this.loadFrame(currentIdx).catch(() => null));
        currentIdx++;
      }

      Promise.all(promises).then(() => {
        if (this.onProgressCallback) {
          this.onProgressCallback(this.imageCache.size, total);
        }
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(loadNextChunk, { timeout: 100 });
        } else {
          setTimeout(loadNextChunk, 15);
        }
      });
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadNextChunk, { timeout: 100 });
    } else {
      setTimeout(loadNextChunk, 15);
    }
  }

  public clearCache(): void {
    this.imageCache.clear();
    this.loadPromises.clear();
  }
}
