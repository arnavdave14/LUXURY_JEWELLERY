// Script to generate high-fidelity luxury jewelry frame sequence (120 frames)
// Each frame represents a 360-degree rotational macro scan with dynamic light reflections,
// facet refraction, 18K yellow gold luster, and emerald-cut diamond highlights.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '../public/sequences/aurelia');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const TOTAL_FRAMES = 120;
const WIDTH = 960;
const HEIGHT = 960;

function createFrameSvg(frameIndex, totalFrames) {
  const progress = frameIndex / totalFrames;
  const angle = progress * Math.PI * 2;
  
  // Camera push & focal distance
  const zoom = 1 + Math.sin(progress * Math.PI) * 0.45;
  const lightAngle = angle + Math.PI / 4;
  const lightX = 480 + Math.cos(lightAngle) * 320;
  const lightY = 480 + Math.sin(lightAngle) * 320;
  
  // Jewelry tilt & rotation
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  
  // Facet highlights calculation
  const flareOpacity = Math.max(0, Math.pow(Math.sin(angle * 2 + Math.PI / 3), 4));
  const sparkleSize = 40 + flareOpacity * 90;
  
  // Ring coordinates
  const cx = 480;
  const cy = 480;
  const radiusX = 220 * zoom;
  const radiusY = (80 + Math.sin(angle) * 35) * zoom;
  
  // Gold band color gradient shifts
  const goldLight = `hsl(43, ${75 + Math.sin(angle) * 15}%, ${72 + Math.cos(angle) * 10}%)`;
  const goldMid = `hsl(38, 65%, 52%)`;
  const goldDark = `hsl(30, 60%, 32%)`;
  
  // Gemstone top geometry
  const gemW = 110 * zoom;
  const gemH = 140 * zoom;
  const gemRot = (Math.sin(angle) * 15).toFixed(2);
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}">
    <defs>
      <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FCFAF5" stop-opacity="1" />
        <stop offset="60%" stop-color="#F5F1E8" stop-opacity="1" />
        <stop offset="100%" stop-color="#ECE5D8" stop-opacity="1" />
      </radialGradient>
      
      <radialGradient id="gemLight" cx="${((lightX/WIDTH)*100).toFixed(1)}%" cy="${((lightY/HEIGHT)*100).toFixed(1)}%" r="65%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95" />
        <stop offset="25%" stop-color="#D8CBD8" stop-opacity="0.8" />
        <stop offset="55%" stop-color="#A85F72" stop-opacity="0.65" />
        <stop offset="85%" stop-color="#30202D" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#180C16" stop-opacity="0.98" />
      </radialGradient>

      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${goldLight}" />
        <stop offset="35%" stop-color="#FFF4D0" />
        <stop offset="55%" stop-color="${goldMid}" />
        <stop offset="85%" stop-color="${goldDark}" />
        <stop offset="100%" stop-color="${goldLight}" />
      </linearGradient>

      <filter id="bloom" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      
      <filter id="sparkleBlur">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>

    <!-- Canvas Background -->
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGlow)" />
    
    <!-- Soft Vignette & Editorial Ambient Aura -->
    <circle cx="480" cy="480" r="380" fill="#E7D7C1" opacity="0.25" filter="url(#bloom)" />
    
    <!-- Fine Technical Measurement Rings -->
    <g opacity="0.35">
      <circle cx="480" cy="480" r="320" fill="none" stroke="#A85F72" stroke-width="0.75" stroke-dasharray="4 8" />
      <circle cx="480" cy="480" r="280" fill="none" stroke="#756B73" stroke-width="0.5" />
      <line x1="480" y1="120" x2="480" y2="150" stroke="#30202D" stroke-width="1" />
      <line x1="480" y1="810" x2="480" y2="840" stroke="#30202D" stroke-width="1" />
      <line x1="120" y1="480" x2="150" y2="480" stroke="#30202D" stroke-width="1" />
      <line x1="810" y1="480" x2="840" y2="480" stroke="#30202D" stroke-width="1" />
      <text x="495" y="145" font-family="monospace" font-size="10" fill="#756B73" letter-spacing="2">ROT: ${(progress * 360).toFixed(0)}°</text>
      <text x="495" y="835" font-family="monospace" font-size="10" fill="#756B73" letter-spacing="2">CARAT: 4.82ct VVS1</text>
    </g>

    <!-- Ring Shadow -->
    <ellipse cx="${cx}" cy="${cy + 130 * zoom}" rx="${radiusX * 0.9}" ry="${radiusY * 0.35}" fill="#30202D" opacity="0.12" filter="url(#bloom)" />

    <!-- 18K Gold Band (Behind Gem) -->
    <ellipse cx="${cx}" cy="${cy + 25 * zoom}" rx="${radiusX}" ry="${radiusY}" fill="none" stroke="url(#goldGradient)" stroke-width="${32 * zoom}" />
    <ellipse cx="${cx}" cy="${cy + 25 * zoom}" rx="${radiusX}" ry="${radiusY}" fill="none" stroke="#FFFFFF" stroke-width="${3 * zoom}" opacity="${0.4 + Math.cos(angle) * 0.3}" />

    <!-- Gemstone Setting / Prongs -->
    <g transform="translate(${cx}, ${cy - 40 * zoom}) rotate(${gemRot})">
      <!-- Emerald-Cut Emerald / Tourmaline / Diamond Solitaire Body -->
      <!-- Pavé under-gallery -->
      <polygon points="${-gemW*0.6},${-gemH*0.6} ${gemW*0.6},${-gemH*0.6} ${gemW*0.75},0 ${gemW*0.6},${gemH*0.6} ${-gemW*0.6},${gemH*0.6} ${-gemW*0.75},0" fill="url(#gemLight)" stroke="#FFF4D0" stroke-width="1.5" filter="url(#bloom)" opacity="0.95" />
      
      <!-- Precision Emerald Cut Facets -->
      <polygon points="${-gemW*0.45},${-gemH*0.45} ${gemW*0.45},${-gemH*0.45} ${gemW*0.52},0 ${gemW*0.45},${gemH*0.45} ${-gemW*0.45},${gemH*0.45} ${-gemW*0.52},0" fill="none" stroke="#FFFFFF" stroke-width="${1.8 * zoom}" opacity="${0.7 + Math.sin(angle * 3) * 0.25}" />
      
      <!-- Table Facet (Center Mirror) -->
      <polygon points="${-gemW*0.3},${-gemH*0.3} ${gemW*0.3},${-gemH*0.3} ${gemW*0.35},0 ${gemW*0.3},${gemH*0.3} ${-gemW*0.3},${gemH*0.3} ${-gemW*0.35},0" fill="#FFFFFF" opacity="${0.2 + flareOpacity * 0.6}" />
      
      <!-- Corner Step Cuts -->
      <line x1="${-gemW*0.6}" y1="${-gemH*0.6}" x2="${-gemW*0.3}" y2="${-gemH*0.3}" stroke="#FFF" stroke-width="1.2" opacity="0.8" />
      <line x1="${gemW*0.6}" y1="${-gemH*0.6}" x2="${gemW*0.3}" y2="${-gemH*0.3}" stroke="#FFF" stroke-width="1.2" opacity="0.8" />
      <line x1="${gemW*0.6}" y1="${gemH*0.6}" x2="${gemW*0.3}" y2="${gemH*0.3}" stroke="#FFF" stroke-width="1.2" opacity="0.8" />
      <line x1="${-gemW*0.6}" y1="${gemH*0.6}" x2="${-gemW*0.3}" y2="${gemH*0.3}" stroke="#FFF" stroke-width="1.2" opacity="0.8" />

      <!-- Four Heavy 18K Gold Prongs -->
      <circle cx="${-gemW*0.55}" cy="${-gemH*0.55}" r="${7 * zoom}" fill="url(#goldGradient)" stroke="#FFF" stroke-width="0.75" />
      <circle cx="${gemW*0.55}" cy="${-gemH*0.55}" r="${7 * zoom}" fill="url(#goldGradient)" stroke="#FFF" stroke-width="0.75" />
      <circle cx="${gemW*0.55}" cy="${gemH*0.55}" r="${7 * zoom}" fill="url(#goldGradient)" stroke="#FFF" stroke-width="0.75" />
      <circle cx="${-gemW*0.55}" cy="${gemH*0.55}" r="${7 * zoom}" fill="url(#goldGradient)" stroke="#FFF" stroke-width="0.75" />
    </g>

    <!-- Front Ring Shank Highlight & Reflection -->
    <ellipse cx="${cx}" cy="${cy + 25 * zoom}" rx="${radiusX * 0.96}" ry="${radiusY * 0.85}" fill="none" stroke="url(#goldGradient)" stroke-width="${14 * zoom}" opacity="0.9" />

    <!-- Optical Lens Flare & Caustic Sparkle on Peak Light -->
    <g transform="translate(${cx + Math.cos(angle * 2) * 50 * zoom}, ${cy - 40 * zoom + Math.sin(angle * 2) * 40 * zoom})" opacity="${flareOpacity}">
      <ellipse rx="${sparkleSize * 1.5}" ry="${3 * zoom}" fill="#FFFFFF" filter="url(#sparkleBlur)" />
      <ellipse rx="${3 * zoom}" ry="${sparkleSize * 1.5}" fill="#FFFFFF" filter="url(#sparkleBlur)" />
      <circle r="${8 * zoom}" fill="#C7E84F" opacity="0.9" />
      <circle r="${4 * zoom}" fill="#FFFFFF" />
      <circle r="${sparkleSize * 0.4}" fill="#FFF" opacity="0.3" filter="url(#sparkleBlur)" />
    </g>

    <!-- Editorial Timecode & Lens Metadata Badge -->
    <g transform="translate(60, 900)" opacity="0.6">
      <text font-family="monospace" font-size="11" fill="#30202D" letter-spacing="3">FRAME // ${String(frameIndex).padStart(4, '0')} / ${String(totalFrames).padStart(4, '0')}</text>
      <text y="18" font-family="monospace" font-size="9" fill="#756B73" letter-spacing="2">AURELIA SOLITAIRE // RAW OPTICAL SCAN 8K</text>
    </g>
    <g transform="translate(820, 900)" opacity="0.6">
      <text font-family="monospace" font-size="11" fill="#C7E84F" font-weight="bold" letter-spacing="2">● 60 FPS</text>
      <text y="18" font-family="monospace" font-size="9" fill="#756B73" letter-spacing="1">REFRACTIVE INDEX: 2.417</text>
    </g>
  </svg>`;
}

console.log(`Generating ${TOTAL_FRAMES} luxury jewelry frames in ${outputDir}...`);

for (let i = 1; i <= TOTAL_FRAMES; i++) {
  const fileName = `frame-${String(i).padStart(4, '0')}.svg`;
  const filePath = path.join(outputDir, fileName);
  const svgContent = createFrameSvg(i, TOTAL_FRAMES);
  fs.writeFileSync(filePath, svgContent, 'utf-8');
}

console.log('Successfully generated all 120 sequence frames!');
