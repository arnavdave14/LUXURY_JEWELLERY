export interface CraftStep {
  id: string;
  stepNumber: string;
  stage: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  secondaryImage: string;
  technicalSpecs: { label: string; value: string }[];
  coordinates: string;
  quote: string;
}

export const CRAFT_STEPS: CraftStep[] = [
  {
    id: 'raw-material',
    stepNumber: '01 / 06',
    stage: 'RAW MATERIAL',
    title: 'Earth & Origin',
    subtitle: 'Fairmined 18K Recycled Gold & Unheated Minerals',
    description: 'We harvest strictly certified Fairmined gold nuggets and ethically uncovered mineral crystals. Every grain is assayed in small 500g crucibles to assure absolute atomic purity and grain consistency.',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=85',
    technicalSpecs: [
      { label: 'Gold Purity', value: '750/1000 Au (18K Solid)' },
      { label: 'Melting Temp', value: '1,064°C Controlled Inert' },
      { label: 'Origin', value: 'Cundinamarca & Broome' }
    ],
    coordinates: 'N 48° 52′ 0″ E 2° 19′ 59″',
    quote: '“Before design exists, the stone already holds its ancient geometry.”'
  },
  {
    id: 'hand-sculpting',
    stepNumber: '02 / 06',
    stage: 'THE HAND',
    title: 'Wax Lost to Fire',
    subtitle: 'Freehand Cire Perdue Sculpting',
    description: 'Our master sculptors shave micro-millimeters of organic wax by hand beneath stereo-microscopes. No CAD template can replicate the subtle, living warmth of a sculptor’s fingertip pressure.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=800&q=85',
    technicalSpecs: [
      { label: 'Sculpt Time', value: '42 Hours per Matrix' },
      { label: 'Tolerance', value: '± 0.02 mm' },
      { label: 'Atelier', value: 'Place Vendôme, Paris' }
    ],
    coordinates: 'N 26° 55′ 0″ E 75° 49′ 0″',
    quote: '“The hand remembers what the eye cannot mathematically define.”'
  },
  {
    id: 'lapidary-cutting',
    stepNumber: '03 / 06',
    stage: 'CRAFT',
    title: 'The Lapidary Facet',
    subtitle: 'Micro-Step Geometry & Optical Axis Alignment',
    description: 'Rough crystals undergo meticulous optical orientation to align the gemstone’s natural c-axis with incoming light rays. Every step facet is hand-polished against diamond cast-iron laps.',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=85',
    technicalSpecs: [
      { label: 'Facet Polish', value: '100,000 Grit Diamond Paste' },
      { label: 'Refraction Score', value: '2.417 Critical Angle' },
      { label: 'Cut Symmetry', value: 'Triple Excellent' }
    ],
    coordinates: 'N 45° 28′ 0″ E 9° 11′ 0″',
    quote: '“Precision is not about speed; it is the dialogue between diamond dust and time.”'
  },
  {
    id: 'setting-metallurgy',
    stepNumber: '04 / 06',
    stage: 'FORM',
    title: 'The Setting & Tension',
    subtitle: 'Talon Prongs & Micro-Pavé Under-Gallery',
    description: 'Each talon prong is individually forged to lock the stone under calibrated mechanical tension. We carve microscopic beads out of the solid gold body itself to seat every single pavé diamond.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1611591475155-4284ec28d351?auto=format&fit=crop&w=800&q=85',
    technicalSpecs: [
      { label: 'Prong Metallurgy', value: 'Cold-Worked 18K Spring Temper' },
      { label: 'Pavé Count', value: 'Up to 320 stones / piece' },
      { label: 'Seat Depth', value: '0.35 mm Precision Recess' }
    ],
    coordinates: 'N 48° 52′ 0″ E 2° 19′ 59″',
    quote: '“A stone should look as though it floats on a whisper of gold.”'
  },
  {
    id: 'light-luster',
    stepNumber: '05 / 06',
    stage: 'LIGHT',
    title: 'Mirror & Satin Buffing',
    subtitle: 'Triple-Compound Hand Finishing',
    description: 'Using Parisian cotton cords, walnut paste, and rouge polishing buffs, the gold is brought from an abrasive raw state to a mirror surface that scatters candlelight with liquid warmth.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=85',
    technicalSpecs: [
      { label: 'Finishing Media', value: 'Vegetable Rouge & Linen Threads' },
      { label: 'Reflection Index', value: '98.6% Visible Spectrum' },
      { label: 'Comfort Fit', value: '1.2mm Crown Interior Fillet' }
    ],
    coordinates: 'N 45° 28′ 0″ E 9° 11′ 0″',
    quote: '“Light is our silent co-creator. We build the architecture for it to dance.”'
  },
  {
    id: 'finished-jewellery',
    stepNumber: '06 / 06',
    stage: 'JEWELLERY',
    title: 'The Final Solitaire',
    subtitle: 'Hallmarked & Sealed into Eternity',
    description: 'The finished jewel is inspected under 40x magnification, stamped with our French Master Hallmark and serial monogram, and encased in custom handmade silk velvet packaging.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=85',
    technicalSpecs: [
      { label: 'Final Weight', value: '18.42 grams' },
      { label: 'Seal', value: 'AURELIA Monogram 0019' },
      { label: 'Warranty', value: 'Lifetime Maison Guarantee' }
    ],
    coordinates: 'N 48° 52′ 0″ E 2° 19′ 59″',
    quote: '“Made slowly. Worn forever.”'
  }
];
