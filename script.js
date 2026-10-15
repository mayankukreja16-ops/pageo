/**
 * PAGEO — SCRIPT.JS
 * Digital Storefront Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCarousel();
  initSearchAndFilters();
  initDrawer();
});

/* --- Live Instant Search --- */
function initSearchAndFilters() {
  const searchInput = document.getElementById('global-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      if (typeof window.applyProductSearch === 'function') {
        window.applyProductSearch();
      }
    });
  }
}

/* --- Theme Toggle with LocalStorage --- */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('pageo_theme') || 'light';
  
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (toggleBtn) toggleBtn.querySelector('.theme-icon').textContent = '☀️';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (toggleBtn) toggleBtn.querySelector('.theme-icon').textContent = '🌙';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('pageo_theme', 'light');
        toggleBtn.querySelector('.theme-icon').textContent = '🌙';
        showToast('Switched to Warm Creative Pastel Mode');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('pageo_theme', 'dark');
        toggleBtn.querySelector('.theme-icon').textContent = '☀️';
        showToast('Switched to Dark Luxe Art Studio Mode');
      }
    });
  }
}

/* --- Hero 3D Carousel Slider --- */
let currentSlide = 0;
let slideInterval;

function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (!slides.length) return;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  window.goToSlide = function(index) {
    showSlide(index);
    resetAutoPlay();
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
      resetAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
      resetAutoPlay();
    });
  }

  function startAutoPlay() {
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 6000);
  }

  function resetAutoPlay() {
    clearInterval(slideInterval);
    startAutoPlay();
  }

  startAutoPlay();
}

/* --- Quick-Pick Horizontal Scroll --- */
window.scrollQuickPicks = function(offset) {
  const slider = document.getElementById('quick-picks-slider');
  if (slider) {
    slider.scrollBy({ left: offset, behavior: 'smooth' });
  }
};

/* --- Coupon Code Copy Feedback --- */
window.copyCouponCode = function(code) {
  navigator.clipboard.writeText(code).then(() => {
    showToast(`Copied code: ${code}! Discount applied.`);
  });
};

/* --- Toast Notification System --- */
function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* --- Support & Preview Modals --- */
window.openSupportModal = function(type) {
  const modal = document.getElementById('support-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  if (!modal || !body) return;

  if (type === 'telegram') {
    title.textContent = '✈️ Telegram VIP Artist Hub';
    body.innerHTML = `
      <p style="margin-bottom: 12px; color: var(--text-muted); font-size: 13px;">Connect with fellow illustrators and get instant alerts on new coloring book releases:</p>
      <div style="background: var(--pill-bg); padding: 14px; border-radius: 10px; border: 1px solid var(--card-border); margin-bottom: 14px;">
        <strong style="color: #0284c7;">Channel Handle:</strong> @PageoArtHub<br>
        <span style="font-size: 12px; color: var(--text-muted);">VIP Drops: @PageoDropBot</span>
      </div>
      <a href="https://t.me" target="_blank" class="btn btn-telegram" style="width: 100%; text-align: center;">Open Telegram Channel →</a>
    `;
  } else if (type === 'whatsapp') {
    title.textContent = '💬 WhatsApp Artist Desk';
    body.innerHTML = `
      <p style="margin-bottom: 12px; color: var(--text-muted); font-size: 13px;">Direct order help and custom Procreate brush inquiries:</p>
      <div style="background: var(--pill-bg); padding: 14px; border-radius: 10px; border: 1px solid var(--card-border); margin-bottom: 14px;">
        <strong style="color: #10b981;">Helpline:</strong> +91 98765 43210
      </div>
      <a href="https://whatsapp.com" target="_blank" class="btn btn-whatsapp" style="width: 100%; text-align: center;">Start WhatsApp Chat →</a>
    `;
  } else if (type === 'contact') {
    title.textContent = '✉️ Contact Pageo Studio';
    body.innerHTML = `
      <form onsubmit="handleContactSubmit(event)" style="display: flex; flex-direction: column; gap: 10px;">
        <input type="text" placeholder="Your Name" required style="padding: 10px; border-radius: 8px; background: var(--bg-main); border: 1px solid var(--card-border); color: var(--text-main);">
        <input type="email" placeholder="Your Email" required style="padding: 10px; border-radius: 8px; background: var(--bg-main); border: 1px solid var(--card-border); color: var(--text-main);">
        <textarea rows="3" placeholder="How can our illustration team help you?" required style="padding: 10px; border-radius: 8px; background: var(--bg-main); border: 1px solid var(--card-border); color: var(--text-main);"></textarea>
        <button type="submit" class="btn btn-primary">Send Message</button>
      </form>
    `;
  } else if (type === 'privacy' || type === 'licensing') {
    title.textContent = '🛡️ Commercial License & Guarantee';
    body.innerHTML = `
      <div style="font-size: 12px; color: var(--text-muted); line-height: 1.6; max-height: 250px; overflow-y: auto;">
        <p><strong>Commercial Publishing:</strong> All Pageo coloring books and vector designs include full commercial rights for Amazon KDP, Etsy print-on-demand, physical posters, and merchandise.</p>
        <p style="margin-top: 8px;"><strong>7-Day Refund Guarantee:</strong> If any digital asset fails to meet 300 DPI print standards, an immediate 100% refund is provided.</p>
      </div>
    `;
  }
  modal.classList.add('open');
};

window.closeSupportModal = function() {
  const modal = document.getElementById('support-modal');
  if (modal) modal.classList.remove('open');
};

window.openProductPreview = function(title, price, desc) {
  const modal = document.getElementById('product-modal');
  const mTitle = document.getElementById('prod-modal-title');
  const mBody = document.getElementById('prod-modal-body');
  if (!modal || !mBody) return;

  mTitle.textContent = title;
  mBody.innerHTML = `
    <div style="font-size: 13px; color: var(--text-muted);">
      <p style="margin-bottom: 12px;">${desc}</p>
      <div style="background: var(--pill-bg); padding: 12px; border-radius: 10px; margin-bottom: 16px;">
        <strong>Price:</strong> <span style="color: #20bf6b; font-size: 16px;">${price}</span> (300 DPI Instant Download)
      </div>
      <button class="btn btn-primary" style="width: 100%;" onclick="handleBuyNow('${title}', 14.99)">Buy & Download Now</button>
    </div>
  `;
  modal.classList.add('open');
};

window.closeProductModal = function() {
  const modal = document.getElementById('product-modal');
  if (modal) modal.classList.remove('open');
};

window.handleBuyNow = function(productName, price) {
  showToast(`Added "${productName}" ($${price}) to checkout!`);
  if (window.closeProductModal) window.closeProductModal();
};

window.downloadFreebie = function(name) {
  showToast(`Downloading freebie package: ${name}.zip`);
};

window.handleNewsletter = function(e) {
  e.preventDefault();
  const input = document.getElementById('newsletter-email');
  if (input && input.value) {
    showToast('Subscribed to Pageo! Free mandala pack bonus sent.');
    input.value = '';
  }
};

window.handleContactSubmit = function(e) {
  e.preventDefault();
  showToast('Ticket submitted! Pageo studio will reply within 4 hours.');
  closeSupportModal();
};

/* --- Mobile Drawer Menu --- */
function initDrawer() {
  const hamburger = document.getElementById('mobile-hamburger');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('drawer-close-btn');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => drawer.classList.add('open'));
  }
  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
  }
}

window.closeMobileDrawer = function() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.remove('open');
};
