/**
 * PAGEO — PRODUCTS & DEALS ENGINE
 * Digital Colouring E-Books, Procreate Brushes, Vector Bundles & Painting Assets
 */

const PRODUCTS_DATA = [
  // 1. Colouring E-Books
  {
    id: 'colour-mandala-zen',
    title: 'Enchanted Flora & Sacred Mandala 300 DPI Colouring E-Book',
    category: 'colouring-books',
    categoryLabel: 'Colouring E-Books',
    badge: 'BEST SELLER',
    price: 12.99,
    originalPrice: 34.99,
    description: '52 print-ready 300 DPI PDF coloring pages of intricate floral mandalas, nocturnal flora, and relaxing sacred geometry.',
    features: ['300 DPI Print-Ready Vector Mastered', 'Amazon KDP Interior Ready (8.5x11")', 'Single-Sided Zero Bleed Layouts', 'Full Commercial POD License'],
    icon: '🌸',
    format: 'Print-Ready PDF + High-Res PNGs'
  },
  {
    id: 'colour-safari-kids',
    title: 'Little Safari & Woodland Explorer: 65 Kids Colouring Book',
    category: 'colouring-books',
    categoryLabel: 'Colouring E-Books',
    badge: 'KDP READY',
    price: 9.99,
    originalPrice: 24.99,
    description: '65 adorable animal illustrations designed with bold, child-friendly outlines, animal names, and fun nature backgrounds.',
    features: ['Extra Bold Line Weights for Toddlers', 'Amazon KDP Paperback Formatted', 'Animals: Lions, Koalas, Pandas & Deer', 'Instant Unlimited Print Rights'],
    icon: '🦁',
    format: 'Print-Ready PDF + JPGs'
  },
  {
    id: 'colour-mystic-fantasy',
    title: 'Mystic Realms & Fantasy Creatures Adult Colouring Book',
    category: 'colouring-books',
    categoryLabel: 'Colouring E-Books',
    badge: 'TRENDING',
    price: 14.99,
    originalPrice: 36.99,
    description: '45 hand-drawn fantasy art pages featuring mystical elves, celestial dragons, dryads, and enchanted fairy groves.',
    features: ['Dual Editions: Clean Line Art + Shaded', '300 DPI Ultra HD Resolution', 'Procreate Layered PSDs Included', 'Extended Commercial POD Rights'],
    icon: '🧚',
    format: 'Dual PDF (Line Art + Grayscale)'
  },
  {
    id: 'colour-cosmic-zodiac',
    title: 'Celestial Zodiac & Moon Phases Colouring Journal',
    category: 'colouring-books',
    categoryLabel: 'Colouring E-Books',
    badge: 'ARTIST FAV',
    price: 11.99,
    originalPrice: 28.99,
    description: '36 cosmic illustrations of astrological constellations, tarot symbols, lunar phases, and ornate celestial goddesses.',
    features: ['All 12 Zodiac Constellations', 'Spiral Binding Safe 0.75" Margin', 'Black & White Background Editions', 'Etsy / KDP Commercial License'],
    icon: '🌙',
    format: 'Print-Ready PDF + Transparent PNGs'
  },

  // 2. Digital Brushes
  {
    id: 'brush-watercolor-master',
    title: 'Master Watercolor & Gouache Studio for Procreate & Photoshop',
    category: 'digital-brushes',
    categoryLabel: 'Digital Brushes',
    badge: 'PRO SUITE',
    price: 17.99,
    originalPrice: 42.99,
    description: '48 hyper-realistic digital watercolor brushes, pigment edge bleeders, salt spatters, and 8 organic cold-press paper templates.',
    features: ['Wet-on-Wet & Dry Edge Simulation', 'Dynamic Pressure & Tilt Calibration', '8 Seamless Cold-Press Papers', 'Layered .procreate & .psd Canvases'],
    icon: '🖌️',
    format: '.brushset (Procreate 5X+) & .abr'
  },
  {
    id: 'brush-comic-ink-flow',
    title: 'Inking & Calligraphy Flow Pro: 35 Dynamic Inking Brushes',
    category: 'digital-brushes',
    categoryLabel: 'Digital Brushes',
    badge: 'BEST SELLER',
    price: 11.99,
    originalPrice: 29.99,
    description: 'Ultra-crisp pens, manga g-pen simulators, flexible brush pens, dry sumi ink markers, and stippling dot shaders.',
    features: ['Manga G-Pen & Studio Inker Replicas', 'Streamline Anti-Tremor Stabilization', 'Pressure Crosshatching & Stippling', 'Commercial Comic Book License'],
    icon: '✒️',
    format: '.brushset & .abr (Photoshop/CSP)'
  },
  {
    id: 'brush-oil-impasto-palette',
    title: 'Oil Impasto & Palette Knife 3D Heavy Texture Brushes',
    category: 'digital-brushes',
    categoryLabel: 'Digital Brushes',
    badge: '3D TEXTURE',
    price: 15.99,
    originalPrice: 38.99,
    description: '36 thick oil paint brushes that simulate dimensional paint ridges, bristly canvas dragging, and palette knife blending.',
    features: ['Realistic 3D Paint Ridges & Relief', 'Palette Knife Smudge & Scrape', 'Dual-Color Auto Blending Engine', '5 Linen Canvas Canvas Presets'],
    icon: '🎨',
    format: '.brushset + Layered PSD Canvas'
  },

  // 3. Vector Designs
  {
    id: 'vector-celestial-mystic',
    title: 'Celestial & Mystical Line Art Vector Bundle (250+ Elements)',
    category: 'vector-designs',
    categoryLabel: 'Vector Designs',
    badge: 'HOT PACK',
    price: 14.99,
    originalPrice: 39.99,
    description: '250+ scalable vector elements: Zodiac constellations, esoteric eyes, sun & moon silhouettes, tarot glyphs, and floral borders.',
    features: ['Infinitely Scalable SVG & EPS 10', 'Transparent 5000px 300 DPI PNGs', 'Canva, Cricut, Illustrator Ready', 'Commercial Merch & Apparel License'],
    icon: '✨',
    format: 'AI, EPS 10, SVG & 300 DPI PNG'
  },
  {
    id: 'vector-boho-terracotta',
    title: 'Boho Terracotta Abstract Foliage & Arch Silhouette Bundle',
    category: 'vector-designs',
    categoryLabel: 'Vector Designs',
    badge: 'TRENDING',
    price: 12.99,
    originalPrice: 32.99,
    description: '180+ modern abstract shapes, sun arches, tropical monstera line leaves, terracotta vases, and aesthetic color palettes.',
    features: ['Warm Earthy Terracotta & Sage Palettes', 'Cricut Cut Files & Canva PNGs', '24 Ready-to-Print Wall Posters', 'Commercial Print-on-Demand Rights'],
    icon: '🌿',
    format: 'SVG, EPS, PDF & Transparent PNG'
  },
  {
    id: 'vector-botanical-wreaths',
    title: 'Delicate Botanical Wreaths, Monograms & Floral Frames',
    category: 'vector-designs',
    categoryLabel: 'Vector Designs',
    badge: 'WEDDING READY',
    price: 10.99,
    originalPrice: 26.99,
    description: '120 hand-drawn vector wildflowers, eucalyptus branches, circular laurel wreaths, and vintage decorative borders.',
    features: ['Delicate Hand-Drawn Organic Lines', 'Gold & Black Line Versions Included', 'SVG / DXF Cut Files for Laser Cutters', 'Unlimited Stationery Client Projects'],
    icon: '💐',
    format: 'SVG, EPS, DXF & 300 DPI PNG'
  },

  // 4. Painting Assets
  {
    id: 'asset-vintage-paper-canvas',
    title: 'Authentic Vintage Canvas & Heavy Rough Watercolor Paper Textures',
    category: 'painting-assets',
    categoryLabel: 'Painting Assets',
    badge: '4K TEXTURES',
    price: 8.99,
    originalPrice: 24.99,
    description: '30 seamless 300 DPI handmade paper textures, rough cotton canvases, and antique aged parchment overlays.',
    features: ['30 Seamless Archival Paper Textures', 'Multiply & Overlay Blend Mode Guide', 'Compatible with Procreate & Photoshop', 'Full Commercial Book Cover License'],
    icon: '📜',
    format: 'High-Res TIFF, JPG (300 DPI)'
  },
  {
    id: 'asset-golden-foil-textures',
    title: 'Metallic Gold, Rose Gold & Holographic Foil Digital Papers',
    category: 'painting-assets',
    categoryLabel: 'Painting Assets',
    badge: 'LUXE PACK',
    price: 9.99,
    originalPrice: 22.99,
    description: '24 luxurious shimmering foil textures with realistic light reflections, glitter specks, and brushed metal finishes.',
    features: ['Realistic Metallic Depth Reflections', 'Seamless Tiling 4000x4000px at 300 DPI', 'Gold, Rose Gold, Copper & Holo Glitz', 'Procreate Clipping Swatches Included'],
    icon: '✨',
    format: '300 DPI Seamless JPGs + Swatches'
  },
  {
    id: 'asset-acrylic-palette-pack',
    title: 'Procreate Pro Color Palette Vault: 60 Curated Palettes (1,800 Swatches)',
    category: 'painting-assets',
    categoryLabel: 'Painting Assets',
    badge: 'COLOR VAULT',
    price: 7.99,
    originalPrice: 19.99,
    description: '60 harmonious color palettes: Vintage pastels, moody cottagecore, vibrant neon pop, skin tones, and nature botanical gradients.',
    features: ['1-Click Instant Import to Procreate', 'Photoshop .ASE & .ACO Files Included', 'PDF Visual Color Guide with HEX Codes', 'Commercial Design Project Use'],
    icon: '🎨',
    format: '.swatches & .ase Palettes'
  }
];

const DEALS_DATA = [
  {
    id: 'deal-canva',
    title: 'Canva Pro for Illustrators & Book Creators',
    category: 'tools',
    badge: '45-DAY FREE TRIAL',
    discount: '45 Days Free',
    coupon: 'PAGEOCANVA',
    desc: 'Access 100M+ design assets, 1-click background remover, unlimited cloud storage, and automated KDP book cover sizing.',
    link: 'https://canva.com',
    icon: '🎨'
  },
  {
    id: 'deal-huion-wacom',
    title: 'Huion Kamvas & Wacom Pen Displays',
    category: 'tablets',
    badge: 'EXCLUSIVE 25% OFF',
    discount: '25% OFF',
    coupon: 'ARTISTTABLET25',
    desc: 'Up to 25% discount on 16-inch 2.5K drawing tablets, laminated anti-glare glass, and 8192 levels of battery-free pen pressure.',
    link: 'https://store.huion.com',
    icon: '🖊️'
  },
  {
    id: 'deal-adobe-cc',
    title: 'Adobe Creative Cloud Artist Bundle',
    category: 'software',
    badge: '40% OFF ANNUAL',
    discount: '40% OFF',
    coupon: 'PAGEOCC40',
    desc: 'Official 40% creator discount on Photoshop, Illustrator, InDesign, and 100GB Adobe Creative Cloud storage.',
    link: 'https://adobe.com/creativecloud',
    icon: '📐'
  },
  {
    id: 'deal-paperlike',
    title: 'Paperlike iPad Screen Protector for Procreate',
    category: 'tablets',
    badge: '20% OFF 2-PACK',
    discount: '20% OFF',
    coupon: 'PAPERPAGEO20',
    desc: 'Nanodot surface engineering mimics real paper resistance for pencil precision, less hand fatigue, and zero glare.',
    link: 'https://paperlike.com',
    icon: '📱'
  },
  {
    id: 'deal-pcloud-storage',
    title: 'pCloud / Dropbox 2TB Lifetime Cloud Storage',
    category: 'cloud',
    badge: '75% OFF LIFETIME',
    discount: '75% OFF',
    coupon: 'ARTCLOUD75',
    desc: 'Encrypted cloud drive to backup your multi-gigabyte 300 DPI PSDs, Procreate time-lapses, and print-ready archives.',
    link: 'https://pcloud.com',
    icon: '☁️'
  }
];

let activeProductFilter = 'all';
let activeDealFilter = 'all';

function escapeHtml(str) {
  return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function renderProducts(items) {
  const container = document.getElementById('products-grid');
  if (!container) return;

  if (!items.length) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">No digital art products match your search.</div>`;
    return;
  }

  container.innerHTML = items.map(p => `
    <div class="product-card">
      <div class="product-card-top">
        <span class="product-badge">${p.badge}</span>
        <span class="product-icon">${p.icon}</span>
      </div>
      <h3 class="product-title">${p.title}</h3>
      <p class="product-desc">${p.description}</p>
      <ul class="product-features">
        ${p.features.map(f => `<li>✓ ${f}</li>`).join('')}
      </ul>
      <div class="product-footer">
        <div class="price-box">
          <span class="price">$${p.price}</span>
          <span class="original-price">$${p.originalPrice}</span>
        </div>
        <div class="product-card-actions">
          <button class="btn-sm-outline" onclick="openProductPreview('${escapeHtml(p.title)}', '$${p.price}', '${escapeHtml(p.description)}')">Preview Art</button>
          <button class="btn-sm-buy" onclick="handleBuyNow('${escapeHtml(p.title)}', ${p.price})">Buy Now</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderDeals(items) {
  const container = document.getElementById('deals-grid');
  if (!container) return;

  if (!items.length) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">No active artist deals found.</div>`;
    return;
  }

  container.innerHTML = items.map(d => `
    <div class="product-card">
      <div class="product-card-top">
        <span class="product-badge" style="color: var(--accent-sage); border-color: rgba(32,191,107,0.3); background: rgba(32,191,107,0.15);">${d.discount}</span>
        <span class="product-icon">${d.icon || '🏷️'}</span>
      </div>
      <h3 class="product-title">${d.title}</h3>
      <p class="product-desc">${d.desc}</p>
      <div class="slide-coupon-box" style="margin: 12px 0; width: 100%;">
        <span style="font-size: 11px; color: var(--text-muted);">Code: <strong>${d.coupon}</strong></span>
        <button class="copy-code-btn" style="margin-left: auto;" onclick="copyCouponCode('${d.coupon}')">Copy</button>
      </div>
      <div class="product-footer">
        <a href="${d.link}" target="_blank" rel="noopener" class="btn btn-primary" style="width: 100%; text-align: center;">Claim Discount →</a>
      </div>
    </div>
  `).join('');
}

window.filterProducts = function(category) {
  activeProductFilter = category;
  document.querySelectorAll('#product-filters .filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });
  applyProductSearch();
};

window.filterDeals = function(category) {
  activeDealFilter = category;
  document.querySelectorAll('#deal-filters .filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase().includes(category) || (category === 'all' && btn.textContent.includes('All')));
  });
  let filtered = DEALS_DATA;
  if (category !== 'all') {
    filtered = filtered.filter(d => d.category === category);
  }
  renderDeals(filtered);
};

window.applyProductSearch = function() {
  const query = (document.getElementById('global-search-input')?.value || '').trim().toLowerCase();
  let filtered = PRODUCTS_DATA;

  if (activeProductFilter !== 'all') {
    filtered = filtered.filter(p => p.category === activeProductFilter);
  }
  if (query) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
  }
  renderProducts(filtered);
};

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(PRODUCTS_DATA);
  renderDeals(DEALS_DATA);
});
