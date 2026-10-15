export type ProductCategory = 
  | 'colouring-books'
  | 'digital-brushes'
  | 'story-children-books'
  | 'calligraphy-lettering'
  | 'vector-kdp-interiors';

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  categoryLabel: string;
  badge: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  description: string;
  detailedOverview: string;
  format: string;
  resolution: string;
  itemCount: string;
  features: string[];
  licenseType: string;
  icon: string;
  bgGradient: string;
  accentColor: string;
  previewSamples?: string[];
  isTopPick?: boolean;
}

export interface Freebie {
  id: string;
  title: string;
  type: string;
  desc: string;
  format: string;
  fileSize: string;
  icon: string;
  downloadUrl: string;
}

export interface HeroSlide {
  id: number;
  tag: string;
  dealTag: string;
  title: string;
  subtitle: string;
  description: string;
  couponCode: string;
  couponLabel: string;
  price: string;
  ctaText: string;
  ctaTarget: ProductCategory | 'bundle-builder' | string;
  icon: string;
  accentColor: string;
  gradient: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 0,
    tag: 'Colouring E-Books',
    dealTag: '300 DPI Print-Ready',
    title: 'Colouring E-Books Master Collection: Sacred Floral & Zen Mandalas',
    subtitle: 'Print-ready ultra high resolution PDF, vector outlines & Amazon KDP interior',
    description: 'Immerse into intricate stress-relief floral mandalas, nocturnal woodland flora, and sacred geometry. Engineered specifically for 300 DPI zero-bleed home printing or Amazon KDP publishing.',
    couponCode: 'PAGEOMANDALA',
    couponLabel: 'Save 30% on Launch Bundle',
    price: '$12.99',
    ctaText: 'Explore Colouring E-Books →',
    ctaTarget: 'colouring-books',
    icon: '🌸',
    accentColor: '#f368e0',
    gradient: 'from-pink-500/20 via-rose-500/10 to-amber-500/20'
  },
  {
    id: 1,
    tag: 'Digital Brushes & Textures',
    dealTag: 'Procreate & Photoshop',
    title: 'Procreate Digital Brushes & Textures Studio (55 Custom Brushes)',
    subtitle: 'Streamlined inking nibs, pencil textures, crosshatch shaders & canvas overlays',
    description: 'Turn your iPad into a master illustration desk with pressure-calibrated ink pens, stippling brushes, and high-res canvas paper textures. 100% vector-crisp and commercial client licensed.',
    couponCode: 'BRUSHMASTER',
    couponLabel: '40% OFF Pro Studio',
    price: '$15.99',
    ctaText: 'Get Digital Brushes →',
    ctaTarget: 'digital-brushes',
    icon: '🖌️',
    accentColor: '#00d2d3',
    gradient: 'from-cyan-500/20 via-teal-500/10 to-indigo-500/20'
  },
  {
    id: 2,
    tag: 'Story & Children Books',
    dealTag: 'Illustrated Narrative',
    title: 'Illustrated Story & Children Books: The Little Stargazer & The Moonlit Dragon',
    subtitle: 'Whimsical story pages with full-color illustrations & bedtime companion PDF',
    description: 'A heartwarming journey of a curious astronomer child and a benevolent starlight dragon across enchanted constellations. Ideal for bedtime reading, tablet storytelling, or physical printing.',
    couponCode: 'STARGAZER25',
    couponLabel: '25% Launch Discount',
    price: '$11.99',
    ctaText: 'Read Story E-Books →',
    ctaTarget: 'story-children-books',
    icon: '🦁',
    accentColor: '#845ec2',
    gradient: 'from-purple-500/20 via-violet-500/10 to-fuchsia-500/20'
  },
  {
    id: 3,
    tag: 'Calligraphy & Hand Lettering',
    dealTag: 'Traceable Practice Sheets',
    title: 'Calligraphy & Hand Lettering Guidebooks (90 Practice Sheets)',
    subtitle: 'Step-by-step stroke breakdown, bouncing baseline guides & Procreate lettering templates',
    description: 'Master bounce lettering, swash flourishes, and modern calligraphy from scratch. Includes printable 300 DPI tracing drills, grid guides, and layered Procreate practice canvases.',
    couponCode: 'LETTERING30',
    couponLabel: 'Save 30% Masterclass Code',
    price: '$13.99',
    ctaText: 'Start Lettering Guides →',
    ctaTarget: 'calligraphy-lettering',
    icon: '✒️',
    accentColor: '#10b981',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20'
  },
  {
    id: 4,
    tag: 'Vector & KDP Interiors',
    dealTag: 'Amazon KDP Publishing Vault',
    title: 'Amazon KDP Low-Content Interior Vault: 100+ Ready-to-Publish Books',
    subtitle: 'Certified PDF interiors for gratitude journals, habit trackers, planners & logbooks',
    description: 'Instant commercial publishing empire in a box. Formatted for Amazon KDP 6x9 and 8.5x11 inch trims with zero bleed errors. Upload directly to Amazon KDP, Etsy, or IngramSpark.',
    couponCode: 'KDPMAGIC',
    couponLabel: 'Instant $10 OFF KDP Vault',
    price: '$18.99',
    ctaText: 'Unlock KDP Interiors →',
    ctaTarget: 'vector-kdp-interiors',
    icon: '📚',
    accentColor: '#ff9f43',
    gradient: 'from-amber-500/20 via-orange-500/10 to-rose-500/20'
  },
  {
    id: 5,
    tag: 'Midnight Velvet Edition',
    dealTag: 'Deep Black Canvas',
    title: 'Midnight Velvet Dark-Background E-Books: Nocturnal Botanical Garden',
    subtitle: 'Dramatic inverted black canvas with bright neon & metallic marker contrast',
    description: 'Specially engineered deep black backgrounds make gel pens, gouache, and neon pastels pop with dramatic brilliance. Zero bleed-through rendering and high-contrast vector outlines.',
    couponCode: 'MIDNIGHT35',
    couponLabel: 'Save 35% Midnight Special',
    price: '$13.49',
    ctaText: 'Explore Midnight Edition →',
    ctaTarget: 'colouring-books',
    icon: '🌌',
    accentColor: '#9d4edd',
    gradient: 'from-indigo-600/20 via-purple-600/15 to-slate-900/30'
  },
  {
    id: 6,
    tag: 'Digital Brushes & Textures',
    dealTag: 'Wet Media Simulation',
    title: 'Watercolor & Gouache Masterclass Suite (48 Brushes + 8 Canvas Overlays)',
    subtitle: 'Authentic wet-on-wet bleeding, pigment edge granulations & 4K paper textures',
    description: 'Experience the magic of traditional painting on iPad and desktop. Realistic wet mixing, pigment dilution, and cold-pressed paper overlays for true artisanal illustrations.',
    couponCode: 'WATERCOLOR40',
    couponLabel: '40% OFF Master Suite',
    price: '$17.99',
    ctaText: 'Get Watercolor Studio →',
    ctaTarget: 'digital-brushes',
    icon: '🎨',
    accentColor: '#00cec9',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-teal-500/20'
  },
  {
    id: 7,
    tag: 'Vector & KDP Interiors',
    dealTag: '250+ Scalable Vectors',
    title: 'Celestial & Mystical Vector Elements: Zodiacs, Moon Phases & Sacred Geometry',
    subtitle: 'Scalable SVG, EPS & 300 DPI transparent PNGs for print-on-demand & book covers',
    description: 'Over 250 handcrafted celestial illustrations, constellation maps, golden sunbursts, and aesthetic mystical iconography. Fully compatible with Canva, Illustrator, and Cricut.',
    couponCode: 'CELESTIAL25',
    couponLabel: '25% Off Vector Vault',
    price: '$14.99',
    ctaText: 'Browse Celestial Vectors →',
    ctaTarget: 'vector-kdp-interiors',
    icon: '✨',
    accentColor: '#e056fd',
    gradient: 'from-violet-500/20 via-fuchsia-500/10 to-amber-500/20'
  },
  {
    id: 8,
    tag: 'Custom Bundle Deal',
    dealTag: 'Flat $24.99 Special',
    title: 'Custom 3-Item Art Bundle: Choose Any 3 Books or Brushes for Flat $24.99',
    subtitle: 'Mix & match across all 5 digital publishing segments and save up to $35+',
    description: 'Choose any combination of colouring books, Procreate brushsets, storybooks, calligraphy sheets, or KDP interior packs. Automatic discount applied in cart with lifetime download access.',
    couponCode: 'BUNDLEMAGIC',
    couponLabel: 'Bundle Automatic $24.99',
    price: '$24.99',
    ctaText: 'Build Custom Bundle →',
    ctaTarget: 'bundle-builder',
    icon: '🎁',
    accentColor: '#ff7675',
    gradient: 'from-rose-500/25 via-amber-500/15 to-purple-500/25'
  }
];

export const PRODUCTS_DATA: Product[] = [
  // ==========================================
  // 1. COLOURING E-BOOKS
  // ==========================================
  {
    id: 'colour-mandala-zen',
    title: 'Enchanted Flora & Sacred Mandala 300 DPI Colouring E-Book',
    category: 'colouring-books',
    categoryLabel: 'Colouring E-Books',
    badge: 'BEST SELLER',
    price: 12.99,
    originalPrice: 34.99,
    rating: 4.96,
    reviewsCount: 382,
    description: '52 print-ready 300 DPI PDF coloring pages of intricate floral mandalas, sacred geometry, and relaxing botanical symmetries.',
    detailedOverview: 'Each page has been vector-rendered at native 300 DPI for ultra-crisp line fidelity whether printed on standard 8.5x11 inch or A4 paper. Perfect for stress relief, colored pencils, fine liners, or imported directly into Procreate for digital coloring. Includes an Amazon KDP commercial interior license.',
    format: 'Print-Ready PDF (300 DPI) + High-Res PNGs',
    resolution: '300 DPI Print Quality (2550 x 3300 px)',
    itemCount: '52 Single-Sided Pages + Color Swatch Test Sheets',
    features: [
      'Print-Ready 300 DPI Vector-Mastered PDF',
      '8.5 x 11 inches Standard (A4 Compatible)',
      'Single-Sided Layouts (No Bleed Through)',
      'Commercial License for Amazon KDP Publishing',
      'Transparent PNGs for Digital iPad Coloring'
    ],
    licenseType: 'Full Commercial & Personal Use (POD / KDP Allowed)',
    icon: '🌸',
    bgGradient: 'from-rose-500/10 to-amber-500/10',
    accentColor: '#f368e0',
    isTopPick: true
  },
  {
    id: 'colour-mystic-fantasy',
    title: 'Mystic Realms & Fantasy Creatures Adult Colouring Book',
    category: 'colouring-books',
    categoryLabel: 'Colouring E-Books',
    badge: 'TRENDING',
    price: 14.99,
    originalPrice: 36.99,
    rating: 4.98,
    reviewsCount: 194,
    description: '45 breathtaking hand-drawn fantasy art pages featuring mystical elves, celestial dragons, dryads, and enchanted castles.',
    detailedOverview: 'Includes both clean line art editions and light grayscale shading editions for artists who love deep contrast, atmospheric lighting, and dramatic shading techniques.',
    format: 'Dual PDF (Pure Line Art + Grayscale Shaded)',
    resolution: '300 DPI Ultra HD (2400 x 3000 px)',
    itemCount: '45 Designs (90 PDF Pages total with dual styles)',
    features: [
      'Dual Editions: Crisp Line Art + Shaded Grayscale',
      'Elves, Mythic Beasts, and Fairy Groves',
      'Procreate Compatible Layered PSD Files',
      'Printable on Cardstock & Watercolor Paper',
      'Commercial Print-On-Demand Permitted'
    ],
    licenseType: 'Commercial & Extended Artist License',
    icon: '🧚',
    bgGradient: 'from-purple-500/10 to-pink-500/10',
    accentColor: '#845ec2',
    isTopPick: true
  },
  {
    id: 'colour-cosmic-zodiac',
    title: 'Celestial Zodiac & Moon Phases Colouring Journal',
    category: 'colouring-books',
    categoryLabel: 'Colouring E-Books',
    badge: 'ARTIST FAV',
    price: 11.99,
    originalPrice: 28.99,
    rating: 4.88,
    reviewsCount: 165,
    description: '36 cosmic illustrations of astrological constellations, tarot symbols, lunar phases, and ornate celestial goddesses.',
    detailedOverview: 'Intricate celestial art that blends astrology, bohemian mysticism, and delicate starlight patterns. Includes margin space for binder hole punching and spiral binding.',
    format: 'Print-Ready PDF + High-Res PNGs',
    resolution: '300 DPI Native Vector Output',
    itemCount: '36 Full-Page Astrological Artworks',
    features: [
      'All 12 Zodiac Constellations & Archetypes',
      'Sacred Moon Phase Sequences',
      'Spiral Binding Safe Margins (0.75" inside border)',
      'Black Background & White Background Editions Included',
      'Lifetime Digital Updates'
    ],
    licenseType: 'Commercial Resale (Etsy / KDP / Shopify)',
    icon: '🌙',
    bgGradient: 'from-indigo-500/10 to-blue-500/10',
    accentColor: '#5f27cd'
  },
  {
    id: 'colour-midnight-velvet',
    title: 'Midnight Velvet: Dark Background Botanical Colouring Book',
    category: 'colouring-books',
    categoryLabel: 'Colouring E-Books',
    badge: 'NEW DROP',
    price: 13.49,
    originalPrice: 32.99,
    rating: 4.95,
    reviewsCount: 128,
    description: '40 luminous floral illustrations set against solid black backgrounds so your gel pens, neon markers, and gouache vividly pop!',
    detailedOverview: 'Specially engineered for midnight colorists. The pure black backdrop ensures zero bleed frustration and highlights bright metallic pens, pastel pencils, and gouache highlights like never before.',
    format: '300 DPI Heavy-Ink PDF + High-Res Inverted PNGs',
    resolution: '300 DPI High-Contrast Inverted Masters',
    itemCount: '40 Velvet Dark-Background Artworks',
    features: [
      'Solid Black Ink Backgrounds for Gel & Neon Pens',
      'Orchids, Roses, Wild Mushrooms & Moth Illustrations',
      'Color Swatch Testing Pages Included',
      'High Contrast Print Master for Inkjet or Laser',
      'Full Commercial Publishing Permission'
    ],
    licenseType: 'Commercial & KDP Print License',
    icon: '🌌',
    bgGradient: 'from-slate-800 to-indigo-950',
    accentColor: '#a29bfe'
  },

  // ==========================================
  // 2. DIGITAL BRUSHES & TEXTURES
  // ==========================================
  {
    id: 'brush-watercolor-master',
    title: 'Master Watercolor & Gouache Studio for Procreate & Photoshop',
    category: 'digital-brushes',
    categoryLabel: 'Digital Brushes & Textures',
    badge: 'PRO SUITE',
    price: 17.99,
    originalPrice: 42.99,
    rating: 4.97,
    reviewsCount: 512,
    description: '48 hyper-realistic digital watercolor brushes, pigment edge bleeders, salt spatters, and 8 organic cold-press paper templates.',
    detailedOverview: 'Created by sampling real Winsor & Newton pigments on Arches 300gsm cold press cotton paper. Features dynamic wet-mix algorithms that bleed naturally when pen pressure is applied.',
    format: '.brushset (Procreate 5X+) & .abr (Photoshop CC)',
    resolution: 'Custom Dynamic Brush Tip Textures up to 4096px',
    itemCount: '48 Brushes + 8 Seamless Paper Textures',
    features: [
      'Wet-on-Wet & Dry Pigment Edge Simulation',
      'Dynamic Pressure & Tilt Shading Calibration',
      'Salt Bloom & Granulation Sponge Textures',
      'Pre-textured Layered Canvas Files (.procreate & .psd)',
      'Step-by-Step Video Mixing Guide Included'
    ],
    licenseType: 'Commercial Illustration & Client Work License',
    icon: '🖌️',
    bgGradient: 'from-cyan-500/10 to-blue-500/10',
    accentColor: '#00d2d3',
    isTopPick: true
  },
  {
    id: 'asset-vintage-paper-canvas',
    title: 'Authentic Vintage Canvas & Heavy Rough Watercolor Paper Textures',
    category: 'digital-brushes',
    categoryLabel: 'Digital Brushes & Textures',
    badge: '4K TEXTURES',
    price: 8.99,
    originalPrice: 24.99,
    rating: 4.94,
    reviewsCount: 310,
    description: '30 seamless 300 DPI handmade paper textures, rough cotton canvases, and antique aged parchment overlays.',
    detailedOverview: 'Scan-sampled from authentic museum-grade archival papers and French cold-pressed cotton sheets at 600 DPI, then mastered to 300 DPI seamless tiles. Works with Multiply or Overlay blending modes to transform flat digital drawings into tangible physical-looking masterpieces.',
    format: 'High-Res TIFF, JPG (300 DPI) & Seamless PAT',
    resolution: '5000 x 5000 px at 300 DPI Master Quality',
    itemCount: '30 Seamless High-Resolution Textures',
    features: [
      '30 Seamless Paper Textures (Arches, Khadi & Canvas)',
      'Drag-and-Drop Blend Mode Quick Guide',
      'Light, Medium & Dark Paper Tone Variations',
      'Compatible with Procreate, Photoshop, Affinity, Canva',
      'Commercial License for Book & Print Covers'
    ],
    licenseType: 'Commercial Print & Digital Use',
    icon: '📜',
    bgGradient: 'from-stone-500/10 to-amber-500/10',
    accentColor: '#b2bec3',
    isTopPick: true
  },
  {
    id: 'brush-oil-impasto-palette',
    title: 'Oil Impasto & Palette Knife 3D Heavy Texture Brushes',
    category: 'digital-brushes',
    categoryLabel: 'Digital Brushes & Textures',
    badge: '3D TEXTURE',
    price: 15.99,
    originalPrice: 38.99,
    rating: 4.89,
    reviewsCount: 188,
    description: '36 thick oil paint brushes that simulate dimensional paint ridges, bristly canvas dragging, and palette knife blending.',
    detailedOverview: 'Brings tactile, heavy-body oil realism to your digital canvas. Includes dual-color mixer brushes that dynamically blend background colors as you paint.',
    format: '.brushset (Procreate) + Layered PSD Canvas',
    resolution: '4K High-Depth Impasto Texture Normals',
    itemCount: '36 Oil & Knife Brushes + 5 Canvas Presets',
    features: [
      'Realistic 3D Paint Ridges & Texture Relief',
      'Palette Knife Smudge & Scrape Tools',
      'Dual-Color Auto Blending Technology',
      '5 Linen & Burlap Canvas Presets',
      'Full Commercial Artwork Rights'
    ],
    licenseType: 'Commercial Artwork & Client Deliverables',
    icon: '🎨',
    bgGradient: 'from-amber-500/10 to-yellow-500/10',
    accentColor: '#e17055'
  },
  {
    id: 'asset-golden-foil-textures',
    title: 'Metallic Gold, Rose Gold & Holographic Foil Digital Papers',
    category: 'digital-brushes',
    categoryLabel: 'Digital Brushes & Textures',
    badge: 'LUXE PACK',
    price: 9.99,
    originalPrice: 22.99,
    rating: 4.89,
    reviewsCount: 142,
    description: '24 luxurious shimmering foil textures with realistic light reflections, glitter specks, and brushed metal finishes.',
    detailedOverview: 'Add instant luxury to coloring book covers, wedding invitations, typography, and vector clip art. Easily clipped to any layer in Procreate, Illustrator, or Photoshop.',
    format: '300 DPI Seamless JPGs + Procreate Clipping Swatches',
    resolution: '4000 x 4000 px at 300 DPI',
    itemCount: '24 Seamless Foil Papers (Gold, Rose Gold, Chrome, Foil)',
    features: [
      'Real Shimmer & Metallic Depth Reflections',
      'Seamless Tiling (Pattern Overlay Ready)',
      'Rose Gold, Yellow Gold, Copper & Holo Glitz',
      'Clipping Mask Tutorial Guide Included',
      'Commercial Merch & Packaging License'
    ],
    licenseType: 'Commercial Product License',
    icon: '✨',
    bgGradient: 'from-amber-500/10 to-yellow-500/10',
    accentColor: '#fdcb6e'
  },
  {
    id: 'asset-acrylic-palette-pack',
    title: 'Procreate Pro Color Palette Vault: 60 Curated Palettes (1,800 Swatches)',
    category: 'digital-brushes',
    categoryLabel: 'Digital Brushes & Textures',
    badge: 'COLOR VAULT',
    price: 7.99,
    originalPrice: 19.99,
    rating: 4.90,
    reviewsCount: 215,
    description: '60 harmonious color palettes: Vintage pastels, moody cottagecore, vibrant neon pop, skin tones, and nature botanical gradients.',
    detailedOverview: 'Takes the guesswork out of color selection. Each 30-color swatch is mathematically balanced with base tones, mid-tones, shadows, and highlight accents.',
    format: '.swatches files for Procreate + ASE / ACO for Photoshop',
    resolution: '1-Click Procreate Palette Import',
    itemCount: '60 Color Palettes (1,800 Harmonious Color Swatches)',
    features: [
      '1-Click Instant Import into Procreate',
      'Categories: Skin, Florals, Sunset, Pastels, Retro',
      'Photoshop .ASE and .ACO Swatches Included',
      'PDF Visual Color Guide with HEX Codes for Canva',
      'Unlimited Commercial Project Use'
    ],
    licenseType: 'Commercial & Personal Design License',
    icon: '🎨',
    bgGradient: 'from-pink-500/10 to-purple-500/10',
    accentColor: '#e84393'
  },

  // ==========================================
  // 3. STORY & CHILDREN BOOKS
  // ==========================================
  {
    id: 'story-safari-kids',
    title: 'Little Safari & Woodland Explorer: 65 Kids Illustrated Activity Book',
    category: 'story-children-books',
    categoryLabel: 'Story & Children Books',
    badge: 'KDP BESTSELLER',
    price: 9.99,
    originalPrice: 24.99,
    rating: 4.92,
    reviewsCount: 248,
    description: '65 adorable animal illustration pages designed with bold, child-friendly outlines, animal names, and fun nature backgrounds.',
    detailedOverview: 'Optimized for toddlers and children aged 3-8 with generous line thickness to minimize crayon spills. Formatted and certified for zero-hassle uploading to Amazon KDP (Kindle Direct Publishing) paperback print-on-demand.',
    format: 'Print-Ready PDF + Individual JPGs',
    resolution: '300 DPI (8.5 x 11 inch format)',
    itemCount: '65 Illustrations + 5 Bonus Activity Sheets',
    features: [
      'Extra Bold Line Weights for Little Hands',
      'Amazon KDP Paper Print Ready PDF',
      'Animals include Lions, Koalas, Pandas & Woodland Deer',
      'Alphabet Letter Tracing on Each Page',
      'Instant Unlimited Reprint Rights'
    ],
    licenseType: 'Commercial KDP / School & Home Use',
    icon: '🦁',
    bgGradient: 'from-amber-500/10 to-orange-500/10',
    accentColor: '#ff9f43',
    isTopPick: true
  },
  {
    id: 'story-stargazer-dragon',
    title: 'The Little Stargazer & The Moonlit Dragon: Illustrated Bedtime Story E-Book',
    category: 'story-children-books',
    categoryLabel: 'Story & Children Books',
    badge: 'AWARD WINNING',
    price: 11.99,
    originalPrice: 29.99,
    rating: 4.97,
    reviewsCount: 176,
    description: '32 full-color lush watercolor storybook pages with poetic narrative verses, starlit landscapes, and endearing character art.',
    detailedOverview: 'A tender bedtime tale about curiosity, gentle courage, and discovering friendship in the night sky. Comes with both high-res printable PDF editions and EPUB format for iPad and Kindle readers.',
    format: 'Full-Color PDF (300 DPI) + EPUB & Audiobook Companion Track',
    resolution: '300 DPI High-Resolution Illustrated Spreads',
    itemCount: '32 Full-Page Illustrated Spreads + Character Profiles',
    features: [
      '32 Vibrant Full-Color Narrative Spreads',
      'Rhyming Bedtime Verses Calibrated for Ages 4-9',
      'Formatted for Both iPad Reading & Print-on-Demand',
      'Printable Coloring Page Bonus Edition Included',
      'Commercial Distribution Rights for Educators'
    ],
    licenseType: 'Commercial & Educational Distribution License',
    icon: '🐉',
    bgGradient: 'from-indigo-600/15 to-purple-600/15',
    accentColor: '#6c5ce7',
    isTopPick: true
  },
  {
    id: 'story-cozy-forest-friends',
    title: 'Cozy Forest Friends: Seasonal Adventures & Rhyming Picture Book',
    category: 'story-children-books',
    categoryLabel: 'Story & Children Books',
    badge: 'READER FAV',
    price: 10.49,
    originalPrice: 26.99,
    rating: 4.91,
    reviewsCount: 135,
    description: 'Join Barnaby the Bear and Pip the Squirrel through autumn harvests, cozy snowy cabins, and blossoming spring meadows.',
    detailedOverview: 'Rich earthy gouache artwork that captures the magic of seasonal changes. Teaches sharing, friendship, and appreciation of nature through delightful rhyming verses.',
    format: '300 DPI Print-Ready PDF + Fixed-Layout EPUB',
    resolution: '300 DPI Landscape Spreads (10 x 8 inches)',
    itemCount: '28 Rich Story Spreads + Nature Observation Checklist',
    features: [
      '28 Full-Spread Warm Gouache Illustrations',
      'Seasonal Nature Exploration Themes',
      'Interactive Spot-the-Hidden-Acorn on Every Page',
      'Ready for Amazon KDP Paperback & Hardcover',
      'Instant Classroom & Library Sharing License'
    ],
    licenseType: 'Commercial & KDP Publishing License',
    icon: '🐿️',
    bgGradient: 'from-amber-600/15 to-stone-600/15',
    accentColor: '#d35400'
  },
  {
    id: 'story-coral-sea-fables',
    title: 'Under the Coral Sea: Ocean Discovery & Mermaid Fables',
    category: 'story-children-books',
    categoryLabel: 'Story & Children Books',
    badge: 'NEW RELEASE',
    price: 12.49,
    originalPrice: 31.99,
    rating: 4.93,
    reviewsCount: 110,
    description: 'Dive deep into glowing coral reefs, playful sea turtles, bioluminescent jellyfish, and whimsical ocean folk.',
    detailedOverview: 'An educational and enchanting underwater journey designed to spark wonder about marine life and coral reef conservation in young readers.',
    format: 'High-Res PDF + Printable Wall Art Posters',
    resolution: '300 DPI (Square 8.5 x 8.5 inch format)',
    itemCount: '30 Vibrant Marine Spreads + 4 Ocean Posters',
    features: [
      '30 Luminous Deep-Sea Watercolor Illustrations',
      'Marine Biology Fun Facts Embedded on Each Spread',
      'Includes 4 High-Resolution Nursery Wall Posters',
      'Amazon KDP Square Trim Ready',
      'Commercial Publishing Rights'
    ],
    licenseType: 'Commercial Merch & Publishing License',
    icon: '🌊',
    bgGradient: 'from-cyan-600/15 to-teal-600/15',
    accentColor: '#0984e3'
  },

  // ==========================================
  // 4. CALLIGRAPHY & HAND LETTERING GUIDES
  // ==========================================
  {
    id: 'calligraphy-modern-masterclass',
    title: 'Modern Brush Calligraphy & Flourishing Masterclass (90 Practice Sheets)',
    category: 'calligraphy-lettering',
    categoryLabel: 'Calligraphy & Hand Lettering Guides',
    badge: 'TOP RATED',
    price: 13.99,
    originalPrice: 35.99,
    rating: 4.98,
    reviewsCount: 420,
    description: 'Comprehensive 90-sheet printable calligraphy workbook covering basic strokes, lowercase & uppercase alphabets, word connections, and flourishing rules.',
    detailedOverview: 'Structured step-by-step curriculum designed for brush pens (Tombow Fudenosuke, Pentel Touch) and digital lettering on iPad. Features traceable dotted letters, directional stroke arrows, and 5 slant guide grid layouts.',
    format: 'Print-Ready PDF (300 DPI) + Layered Procreate Canvases',
    resolution: '300 DPI Native Vector-Crisp Stroke Guides',
    itemCount: '90 Traceable Practice Sheets + 6 Lettering Grid Templates',
    features: [
      '90 Comprehensive Traceable Practice Drills',
      'Uppercase, Lowercase, Numbers & Punctuation',
      'Word Connection & Bouncing Baseline Exercises',
      'Decorative Swashes & Flourishing Rules',
      'Layered Procreate Practice Files with Guide Guidelines'
    ],
    licenseType: 'Commercial Client & Practice License',
    icon: '✒️',
    bgGradient: 'from-emerald-500/10 to-teal-500/10',
    accentColor: '#00b894',
    isTopPick: true
  },
  {
    id: 'brush-comic-ink-flow',
    title: 'Inking & Calligraphy Flow Pro: 35 Dynamic Inking Brushes & Nibs',
    category: 'calligraphy-lettering',
    categoryLabel: 'Calligraphy & Hand Lettering Guides',
    badge: 'BEST SELLER',
    price: 11.99,
    originalPrice: 29.99,
    rating: 4.93,
    reviewsCount: 320,
    description: 'Flexible brush pens, copperplate dip nibs, dry sumi ink markers, and streamline lettering pens for smooth iPad lettering.',
    detailedOverview: 'Tuned specifically for clean lines, snappy taper response, and zero hand tremor with intelligent streamline stabilization. Ideal for hand lettering, invitation addressing, comics, and tattoo stencils.',
    format: '.brushset (Procreate) & .abr (Photoshop / Clip Studio)',
    resolution: 'Pressure-Calibrated Vector-Crisp Stencils',
    itemCount: '35 Specialized Inking & Lettering Brushes',
    features: [
      'Smooth Hand Lettering Flexible Calligraphy Nib',
      'Dynamic Pressure Taper & Smooth Streamline',
      'Pressure-Sensitive Crosshatching & Stippling',
      'Copperplate & Modern Script Pen Replicas',
      'Commercial Usage for Stationery & Merchandise'
    ],
    licenseType: 'Commercial & Merch Publishing',
    icon: '🖋️',
    bgGradient: 'from-slate-500/10 to-zinc-500/10',
    accentColor: '#2d3436'
  },
  {
    id: 'calligraphy-wedding-script',
    title: 'Elegant Wedding Script & Copperplate Traceable Alphabet Workbook',
    category: 'calligraphy-lettering',
    categoryLabel: 'Calligraphy & Hand Lettering Guides',
    badge: 'WEDDING PRO',
    price: 12.99,
    originalPrice: 32.99,
    rating: 4.94,
    reviewsCount: 198,
    description: 'Master formal wedding invitation script, luxury monograms, envelope addressing layouts, and flourishing ampelsands.',
    detailedOverview: 'Includes 55 angle-calibrated 55-degree slant guides, flourishing banners, RSVP header designs, and table number lettering templates used by professional stationery artists.',
    format: 'Printable 300 DPI PDF + SVG Monogram Cutters',
    resolution: '300 DPI High-Precision Guideline Masters',
    itemCount: '55 Practice Sheets + 20 Wedding Header Vectors',
    features: [
      'Traditional 55-Degree Copperplate Slant Angle Drills',
      'Luxury Envelope Addressing Layout Guidelines',
      'Ornate Capital Letter Variations (3 Styles per Letter)',
      'Compatible with Lightboxes, Tracing Paper & Procreate',
      'Commercial License for Wedding Stationery Clients'
    ],
    licenseType: 'Commercial Stationery & Client License',
    icon: '💌',
    bgGradient: 'from-rose-500/10 to-stone-500/10',
    accentColor: '#e056fd'
  },
  {
    id: 'calligraphy-gothic-blackletter',
    title: 'Gothic & Blackletter Calligraphy Digital Practice Studio',
    category: 'calligraphy-lettering',
    categoryLabel: 'Calligraphy & Hand Lettering Guides',
    badge: 'HISTORIC ART',
    price: 10.99,
    originalPrice: 27.99,
    rating: 4.89,
    reviewsCount: 145,
    description: 'Fraktur, Textura Quadrata, and Modern Neo-Gothic calligraphy guide sheets with dual-nib Procreate chisel brushes.',
    detailedOverview: 'Explore the historic grandeur of medieval manuscripts and modern street-gothic typography. Includes 40 structured grid drills and 8 custom flat-nib digital brushes that lock to precise 45-degree pen angles.',
    format: '300 DPI PDF Drills + 8 Procreate Chisel Brushes',
    resolution: '300 DPI Geometric Grid Drills',
    itemCount: '40 Practice Sheets + 8 Specialized Chisel Brushes',
    features: [
      'Fraktur & Textura Quadrata Historical Alphabets',
      '45-Degree Diamond Cut Angle Drills',
      '8 Pressure-Calibrated Flat Chisel Brushes for iPad',
      'Illuminated Initial Letter Design Templates',
      'Commercial Merch & Tattoo Flash License'
    ],
    licenseType: 'Commercial Apparel & Tattoo Rights',
    icon: '🏰',
    bgGradient: 'from-zinc-600/15 to-neutral-700/15',
    accentColor: '#353b48'
  },

  // ==========================================
  // 5. VECTOR & KDP INTERIORS
  // ==========================================
  {
    id: 'kdp-interior-vault-master',
    title: 'Complete Amazon KDP Low-Content Interior Vault (100+ Ready-to-Publish Books)',
    category: 'vector-kdp-interiors',
    categoryLabel: 'Vector & KDP Interiors',
    badge: 'KDP PASS',
    price: 18.99,
    originalPrice: 49.99,
    rating: 4.99,
    reviewsCount: 620,
    description: '100+ pre-formatted, Amazon KDP-certified interior PDF templates: Daily Planners, Habit Trackers, Gratitude Journals, Recipe Books, and Mileage Logs.',
    detailedOverview: 'Your fast-track to building a recurring royalty stream on Amazon KDP. Every interior comes in standard 6x9, 8.5x11, and 8.25x6 inch dimensions with perfect 100-page and 120-page counts. Zero bleed margin errors guaranteed.',
    format: 'Amazon KDP Ready PDFs + Editable Canva & InDesign Templates',
    resolution: 'Native 300 DPI Zero-Bleed Vectors',
    itemCount: '100+ Complete Multi-Page Book Interiors',
    features: [
      '100+ Ready-to-Upload Amazon KDP Certified PDFs',
      'Standard Trims: 6x9 inch, 8.5x11 inch & 7x10 inch',
      'Planners, Fitness Logs, Budget Trackers & Dot Grids',
      'Includes Fully Editable Canva Template Links',
      'Unlimited Commercial Publishing on Amazon & IngramSpark'
    ],
    licenseType: 'Commercial Unlimited KDP Resale Rights',
    icon: '📑',
    bgGradient: 'from-amber-500/15 to-rose-500/15',
    accentColor: '#e67e22',
    isTopPick: true
  },
  {
    id: 'vector-celestial-mystic',
    title: 'Celestial & Mystical Line Art Vector Bundle (250+ Elements)',
    category: 'vector-kdp-interiors',
    categoryLabel: 'Vector & KDP Interiors',
    badge: 'HOT PACK',
    price: 14.99,
    originalPrice: 39.99,
    rating: 4.95,
    reviewsCount: 440,
    description: '250+ scalable vector elements: Zodiac constellations, esoteric eyes, sun & moon silhouettes, tarot glyphs, and floral borders.',
    detailedOverview: 'Crafted with precision clean bezier curves. Provided in SVG, EPS, high-res transparent PNG (5000px), and AI format for easy recoloring, scaling, and printing on physical products.',
    format: 'AI, EPS 10, SVG, & 300 DPI Transparent PNG',
    resolution: 'Infinitely Scalable Vectors + 5000px PNGs',
    itemCount: '250+ Individual Vector Motifs + 20 Pre-Made Logos',
    features: [
      'Infinitely Scalable Vector EPS & SVG Files',
      'Compatible with Canva, Illustrator, Figma, Cricut',
      'Transparent 300 DPI PNGs for Drag & Drop',
      '20 Editable Bohemian Brand Monograms',
      'Commercial License for Apparel, Mugs & Digital Prints'
    ],
    licenseType: 'Commercial Unlimited Physical & Digital Products',
    icon: '✨',
    bgGradient: 'from-violet-500/10 to-purple-500/10',
    accentColor: '#6c5ce7',
    isTopPick: true
  },
  {
    id: 'vector-boho-terracotta',
    title: 'Boho Terracotta Abstract Foliage & Arch Silhouette Bundle',
    category: 'vector-kdp-interiors',
    categoryLabel: 'Vector & KDP Interiors',
    badge: 'TRENDING',
    price: 12.99,
    originalPrice: 32.99,
    rating: 4.91,
    reviewsCount: 275,
    description: '180+ modern abstract shapes, sun arches, tropical monstera line leaves, terracotta vases, and aesthetic color palettes.',
    detailedOverview: 'Curated for trendy wall decor, social media templates, branding, and lifestyle packaging. Includes 24 pre-arranged art gallery prints in 4:5 and 2:3 ratios.',
    format: 'SVG, EPS, PDF, & Transparent PNG',
    resolution: 'Scalable Vector + 300 DPI 4000x5000px Prints',
    itemCount: '180 Elements + 24 Ready-to-Print Wall Posters',
    features: [
      'Warm Earthy Terracotta & Sage Color Palette Included',
      'Cricut & Silhouette Cutter Ready SVG',
      'Canva Drag & Drop Compatible PNGs',
      '24 Pre-Made Wall Art Layouts (A3 / 16x20 ready)',
      'Full Commercial & Print-On-Demand Rights'
    ],
    licenseType: 'Commercial Use for POD & Merch',
    icon: '🌿',
    bgGradient: 'from-orange-500/10 to-stone-500/10',
    accentColor: '#d63031'
  },
  {
    id: 'vector-botanical-wreaths',
    title: 'Delicate Botanical Wreaths, Monograms & Floral Frames',
    category: 'vector-kdp-interiors',
    categoryLabel: 'Vector & KDP Interiors',
    badge: 'WEDDING READY',
    price: 10.99,
    originalPrice: 26.99,
    rating: 4.87,
    reviewsCount: 160,
    description: '120 hand-drawn vector wildflowers, eucalyptus branches, circular laurel wreaths, and vintage decorative borders.',
    detailedOverview: 'Ideal for wedding invitation suites, greeting cards, book cover borders, logo design, and craft cutting machines. Every leaf and petal was meticulously drawn with organic line variation.',
    format: 'SVG, EPS, DXF, PNG',
    resolution: 'Vector Master + 300 DPI Transparent PNG',
    itemCount: '120 Vector Frames & Wildflower Elements',
    features: [
      'SVG / DXF Cut Files for Cricut & Laser Cutters',
      'Delicate Hand-Drawn Organic Line Work',
      'Transparent Gold & Black Line Versions Included',
      'Perfect for Stationery & Book Title Frames',
      'Unlimited Commercial Client Projects'
    ],
    licenseType: 'Commercial & Extended Stationery Rights',
    icon: '💐',
    bgGradient: 'from-emerald-500/10 to-teal-500/10',
    accentColor: '#00b894'
  },
  {
    id: 'kdp-kids-activity-mazes',
    title: 'Kids Logic Mazes, Sudoku & Word Search KDP Interior Pack',
    category: 'vector-kdp-interiors',
    categoryLabel: 'Vector & KDP Interiors',
    badge: 'KDP CERTIFIED',
    price: 14.49,
    originalPrice: 34.99,
    rating: 4.92,
    reviewsCount: 205,
    description: '150 unique maze puzzles with solution keys, fun animal borders, and kids word searches ready for Amazon publishing.',
    detailedOverview: 'Children activity books are among the highest-volume bestsellers on Amazon. This package gives you 150 unique vector-rendered puzzles with solution sections, formatted into complete 8.5x11 inch manuscripts.',
    format: '300 DPI PDF (8.5x11") + Source Illustrator Files',
    resolution: '300 DPI Print Quality with Solutions Section',
    itemCount: '150 Puzzles with Complete Solutions Index',
    features: [
      '150 High-Res Vector Maze Puzzles + Solutions',
      'Tiered Difficulty: Easy, Medium, and Champion',
      '8.5 x 11 inches Standard Trim for Amazon KDP',
      'Zero Margin Bleed Error Certification',
      'Commercial Unlimited Paperback Publishing Rights'
    ],
    licenseType: 'Commercial Amazon KDP Publishing License',
    icon: '🧩',
    bgGradient: 'from-blue-500/10 to-indigo-500/10',
    accentColor: '#0984e3'
  }
];

export const FREEBIES_DATA: Freebie[] = [
  {
    id: 'free-mandala-pack',
    title: '5 Free Printable 300 DPI Mandala Pages',
    type: 'Colouring Sample',
    desc: 'High-res print-ready PDF with 5 intricate botanical and sacred mandala pages for relaxing coloring.',
    format: 'PDF 300 DPI (8.5x11")',
    fileSize: '14.2 MB',
    icon: '🌸',
    downloadUrl: '#'
  },
  {
    id: 'free-procreate-brush-duo',
    title: 'Starter Procreate Inking & Pencil Duo',
    type: 'Digital Brushset',
    desc: 'Hand-calibrated 2B sketching pencil and snappy ink brush for smooth iPad drawings.',
    format: '.brushset (Procreate)',
    fileSize: '4.8 MB',
    icon: '🖌️',
    downloadUrl: '#'
  },
  {
    id: 'free-botanical-vectors',
    title: '15 Botanical & Wildflower Vector Elements',
    type: 'Vector SVG / PNG',
    desc: 'Commercial use hand-drawn eucalyptus leaves, daisy outlines, and delicate foliage vectors.',
    format: 'SVG + Transparent PNG',
    fileSize: '8.1 MB',
    icon: '🌿',
    downloadUrl: '#'
  },
  {
    id: 'free-watercolor-paper-sample',
    title: 'Real Cold-Pressed Watercolor Paper 4K Texture',
    type: 'Paper Overlay',
    desc: 'High-res 300 DPI seamless cold-press paper texture with quick blend mode overlay instructions.',
    format: 'JPG (4000x4000px)',
    fileSize: '11.5 MB',
    icon: '📜',
    downloadUrl: '#'
  }
];
