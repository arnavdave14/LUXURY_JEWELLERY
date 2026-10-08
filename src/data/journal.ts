export interface JournalArticle {
  id: string;
  slug: string;
  issue: string;
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  author: string;
  category: string;
  coverImage: string;
  excerpt: string;
  content: string[];
  pullQuote: string;
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'jaipur-colombian-emeralds',
    slug: 'jaipur-colombian-emeralds',
    issue: 'VOLUME IV — ESSAY 01',
    title: 'The Jaipur Atelier & Colombian Emeralds',
    subtitle: 'Tracing the 400-year dialogue between Muzo green crystals and royal Indian gem-cutters.',
    readTime: '6 MIN READ',
    date: 'OCTOBER 2026',
    author: 'Elena Rostova, Senior Curator',
    category: 'MINERALOGY & HISTORY',
    coverImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=85',
    excerpt: 'Deep in the walled city of Jaipur, where morning mist settles over marble courtyards, our lapidaries continue an unbroken four-century tradition of orienting rough Muzo crystals to trap light.',
    content: [
      'Emeralds do not behave like diamonds. Where diamonds refract light through crisp mathematical symmetry, an emerald drinks light into its botanical jardin — its micro-inclusions of ancient brine and gas captured millions of years ago in the Colombian Andes.',
      'In our Jaipur atelier, every rough emerald crystal is observed dry under natural morning light for three weeks before a single cut is made. The master lapidary must listen to the grain of the stone, determining the exact angle where the green deepens from pale mint into royal forest green.'
    ],
    pullQuote: '“An emerald is not a static mineral. It is compressed geological memory trapped in green crystal.”'
  },
  {
    id: 'solitaire-light-mechanics',
    slug: 'solitaire-light-mechanics',
    issue: 'VOLUME IV — ESSAY 02',
    title: 'Solitaire Light Mechanics: The Math of Refraction',
    subtitle: 'How sub-micron optical facets turn ambient room light into moving chromatic fire.',
    readTime: '8 MIN READ',
    date: 'SEPTEMBER 2026',
    author: 'Dr. Marcus Vance, Optical Physicist',
    category: 'SCIENCE & CRAFT',
    coverImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85',
    excerpt: 'Why does an Aurelia step-cut shimmer differently than a commercial brilliant cut? A deep dive into Snell’s law, critical angle reflections, and pavilion depth ratios.',
    content: [
      'When light enters a high-index gem at 2.417 refractive index, it bends at extreme angles. If the pavilion angles are calibrated with precision within 0.05 degrees, 100% of incident light undergoes total internal reflection, shooting back through the table facet directly into the viewer’s eye.',
      'We deliberately avoid computerized robotic auto-cutters in favor of human feedback loops, where the artisan adjusts facet depths according to the unique crystalline density of each individual rough stone.'
    ],
    pullQuote: '“True luxury occurs at the intersection of rigorous optical physics and intuitive human craftsmanship.”'
  },
  {
    id: 'slow-luxury-manifesto',
    slug: 'slow-luxury-manifesto',
    issue: 'VOLUME IV — ESSAY 03',
    title: 'The Slow Luxury Manifesto: 18K Recycled Gold',
    subtitle: 'Why we produce only 180 numbered pieces per year from closed-loop precious metals.',
    readTime: '5 MIN READ',
    date: 'AUGUST 2026',
    author: 'Aurelia Founders Collective',
    category: 'SUSTAINABILITY & PHILOSOPHY',
    coverImage: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=85',
    excerpt: 'In an age of instant drops and rapid cycles, we choose the deliberate slowness of hand-forged gold, Fairmined certitude, and timeless heirloom design.',
    content: [
      'Gold is eternal. The gold resting against your collarbone today may have once been part of an ancient Byzantine coin or an Art Deco brooch. By refining 100% recycled 18K gold in small batch runs, we close the loop with zero fresh mining footprint while preserving supreme metallurgical density.',
      'We reject mass manufacturing. Each jewel requires between 40 to 120 hours of focused manual labor, stamped with its unique archive number and preserved in our permanent Paris register.'
    ],
    pullQuote: '“Made slowly. Worn forever. Passed down through generations without losing its soul.”'
  }
];
