export interface ProductVariant {
  id: string;
  name: string;
  type: 'size' | 'gold_finish';
  options: string[];
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  subtitle: string;
  collection: 'Solstice' | 'L’Émeraude' | 'Celeste' | 'Atelier Signature';
  price: string;
  priceNumeric: number;
  category: 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets' | 'Bespoke';
  carat: string;
  metal: string;
  origin: string;
  dimensions: string;
  heroImage: string;
  macroImage: string;
  modelImage: string;
  craftImage: string;
  gallery: string[];
  description: string;
  editorialQuote: string;
  craftDetails: string[];
  certifications: string[];
  badge?: string;
  frameSequence?: {
    path: string;
    frameCount: number;
    fallbackImage: string;
    padLength?: number;
    extension?: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: 'aurelia-solitaire',
    slug: 'aurelia-solitaire',
    sku: 'AUR-RG-019',
    name: 'Aurelia Solitaire',
    subtitle: '18K Recycled Gold & 4.82ct Columbian Emerald Cut',
    collection: 'L’Émeraude',
    price: '₹148,000',
    priceNumeric: 148000,
    category: 'Rings',
    carat: '4.82ct VVS1',
    metal: '18K Recycled Yellow Gold',
    origin: 'Muzo Mines & Atelier Paris',
    dimensions: '14.2mm × 10.8mm stone face',
    heroImage: '/Frame1/ezgif-frame-001.jpg',
    macroImage: '/Frame1/ezgif-frame-075.jpg',
    modelImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    craftImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      '/Frame1/ezgif-frame-001.jpg',
      '/Frame1/ezgif-frame-060.jpg',
      '/Frame1/ezgif-frame-120.jpg',
      '/Frame1/ezgif-frame-180.jpg',
      '/Frame1/ezgif-frame-240.jpg'
    ],
    description: 'Sculpted by hand in our Place Vendôme atelier, the Aurelia Solitaire features an octagonal step-cut Colombian emerald of profound verdant depth, held in four architectural talon prongs over a softly contoured 18K solid recycled gold shank.',
    editorialQuote: '“A gemstone that does not merely reflect light, but bends the surrounding atmosphere into a slow, private radiance.”',
    craftDetails: [
      'Beveled bezel and four hand-filed architectural talon prongs',
      'Responsibly sourced Muzo emerald certified untreated oiling',
      'High-polish hand-buffed interior comfort curve',
      'Micro-engraved atelier hallmark and individualized serial code'
    ],
    certifications: ['GIA Report #82109312', 'Fairmined Gold Standard', 'RJCOSC Certification'],
    badge: 'SIGNATURE PIECE',
    frameSequence: {
      path: '/Frame1/ezgif-frame-',
      frameCount: 300,
      padLength: 3,
      extension: '.jpg',
      fallbackImage: '/Frame1/ezgif-frame-001.jpg'
    }
  },
  {
    id: 'celeste-pave-choker',
    slug: 'celeste-pave-choker',
    sku: 'CEL-NK-044',
    name: 'Céleste Pavé Choker',
    subtitle: 'Fluid Articulated Gold with 320 Brilliant Diamonds',
    collection: 'Celeste',
    price: '₹385,000',
    priceNumeric: 385000,
    category: 'Necklaces',
    carat: '6.40ct Total F-G / VVS',
    metal: '18K White & Yellow Gold Duo',
    origin: 'Atelier Jaipur & Geneva',
    dimensions: '38cm adjustable choker length',
    heroImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
    macroImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85',
    modelImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
    craftImage: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'An articulated ribbon of micro-pavé diamonds engineered with concealed ball-bearings that fluidly contours to the clavicle, moving like molten light with every breath.',
    editorialQuote: '“Engineering liquid gold to behave with the soft grace of silk fabric against the throat.”',
    craftDetails: [
      '320 hand-set brilliant-cut round diamonds in scalloped setting',
      'Concealed double-safety clasp with push-trigger release',
      'Flexible link matrix requiring 84 hours of master goldsmithing'
    ],
    certifications: ['IGI Diamond Dossier', 'Conflict-Free Kimberley Process'],
    badge: 'MASTERPIECE'
  },
  {
    id: 'sovereign-pearl-earrings',
    slug: 'sovereign-pearl-earrings',
    sku: 'SOV-ER-102',
    name: 'Sovereign Pearl Ear-Clips',
    subtitle: 'Baroque South Sea Pearls & Rose-Cut Diamond Drops',
    collection: 'Solstice',
    price: '₹112,000',
    priceNumeric: 112000,
    category: 'Earrings',
    carat: '2.10ct Diamonds + 15mm Pearls',
    metal: '18K Rose Gold & Platinum 950',
    origin: 'Broome, Australia & Atelier Paris',
    dimensions: '42mm total drop length',
    heroImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
    macroImage: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1000&q=85',
    modelImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85',
    craftImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'A striking asymmetrical duo of naturally irregular Australian Baroque pearls, suspended beneath organic diamond-studded lichen branches in brushed 18K rose gold.',
    editorialQuote: '“Imperfection elevated to sovereign luxury — no two pearls will ever share the same contour.”',
    craftDetails: [
      'Hand-matched natural luster baroque south sea pearls',
      'Vintage rose-cut diamond accents set in darkened platinum cups',
      'Featherweight hollow-core casting for effortless all-day wear'
    ],
    certifications: ['GIA Pearl Identification', 'Fairmined Gold'],
    badge: 'LIMITED EDITION'
  },
  {
    id: 'vesper-tourmaline-cuff',
    slug: 'vesper-tourmaline-cuff',
    sku: 'VES-BR-088',
    name: 'Vesper Indicolite Cuff',
    subtitle: 'Paraiba Tourmaline & Heavy Sculpted 18K Brushed Gold',
    collection: 'Atelier Signature',
    price: '₹265,000',
    priceNumeric: 265000,
    category: 'Bracelets',
    carat: '3.90ct Neon Indicolite',
    metal: '18K Satin Yellow Gold',
    origin: 'Mozambique & Atelier Milano',
    dimensions: '62mm inner wrist circumference',
    heroImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
    macroImage: '/Frame1/ezgif-frame-120.jpg',
    modelImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=85',
    craftImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
      '/Frame1/ezgif-frame-120.jpg'
    ],
    description: 'Substantial, brutalist-inspired solid gold cuff hand-finished with an organic Florentine cross-hatch texture, holding a mesmerizing neon blue-green Indicolite Tourmaline.',
    editorialQuote: '“Heavy, grounding, and unapologetically sculptural.”',
    craftDetails: [
      'Florentine burin hand-engraving across outer band',
      'Tension-fit spring hinge for seamless wrist contour',
      'Rare unheated electric copper-bearing tourmaline'
    ],
    certifications: ['SSEF Swiss Gemmological Institute', 'Responsible Jewellery Council'],
    badge: 'ONE OF ONE'
  },
  {
    id: 'solstice-talisman-pendant',
    slug: 'solstice-talisman-pendant',
    sku: 'SOL-PD-033',
    name: 'Solstice Sun Talisman',
    subtitle: 'Antique Portrait-Cut Diamond & Hand-Chiseled Gold Medallion',
    collection: 'Solstice',
    price: '₹192,000',
    priceNumeric: 192000,
    category: 'Necklaces',
    carat: '1.95ct Portrait Diamond',
    metal: '18K Yellow Gold & Black Rhodium',
    origin: 'Atelier Jaipur',
    dimensions: '28mm diameter medallion on 50cm curb chain',
    heroImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85',
    macroImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=85',
    modelImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    craftImage: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Inspired by ancient celestial navigation charts, this talisman houses an ultra-rare wafer-thin portrait cut diamond over a miniature hand-painted astrological dial.',
    editorialQuote: '“Wear your personal compass of astronomical gold and celestial light.”',
    craftDetails: [
      'Hand-carved celestial rays using traditional chasing & repoussé',
      'Ultra-thin 0.8mm table portrait diamond with optical clarity',
      'Heavy solid curb chain with custom lobster mechanism'
    ],
    certifications: ['GIA Diamond Certification', 'Jaipur Royal Goldsmith Archive'],
    badge: 'HISTORIC RE-EDITION'
  },
  {
    id: 'nocturne-signet-ring',
    slug: 'nocturne-signet-ring',
    sku: 'NOC-RG-077',
    name: 'Nocturne Onyx & Diamond Signet',
    subtitle: 'Matte Black Onyx Tablet with Floating Marquise Diamond',
    collection: 'Atelier Signature',
    price: '₹126,000',
    priceNumeric: 126000,
    category: 'Rings',
    carat: '1.20ct Marquise Diamond',
    metal: '18K White Gold & Satin Finish',
    origin: 'Atelier Paris',
    dimensions: '16mm × 14mm signet shield',
    heroImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=85',
    macroImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
    modelImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
    craftImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'An architectural signet ring combining a midnight-black Brazilian onyx plate with an optical tension-set marquise diamond floating across the geometric divide.',
    editorialQuote: '“High-contrast modernism for those who regard jewellery as architectural form.”',
    craftDetails: [
      'Laser-cut calibrated natural onyx slab',
      'Floating tension mount requiring exact micron tolerances',
      'Ergonomic weighted ring base preventing rotation on finger'
    ],
    certifications: ['GIA Diamond Report', 'Fairmined Certified'],
    badge: 'NEW ARRIVAL'
  }
];
