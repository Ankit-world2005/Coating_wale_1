/**
 * NANOVEIL™ - Dynamic Motion, Sensitivity & Interaction Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursorAura();
  initHeaderScroll();
  initTiltCards();
  initBeforeAfterSlider();
  initHydrophobicSimulator();
  initSurfaceTabs();
  initCalculator();
  initFAQAccordion();
  initBookingModal();
  initScrollAnimations();
  initProductFilters();
  initCart();
  initPinterestHero();
});

/* ----------------------------------------------------
   1. Sensitive Cursor Aura
---------------------------------------------------- */
function initCursorAura() {
  const aura = document.querySelector('.cursor-aura');
  if (!aura) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderAura() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    aura.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderAura);
  }
  renderAura();
}

/* ----------------------------------------------------
   2. Header Scroll Effect
---------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

/* ----------------------------------------------------
   3. 3D Sensitive Card Tilt
---------------------------------------------------- */
function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

/* ----------------------------------------------------
   4. Before & After Split Comparison Slider
---------------------------------------------------- */
function initBeforeAfterSlider() {
  const card = document.querySelector('.comparison-card');
  const afterBox = document.querySelector('.comparison-after-box');
  const handle = document.querySelector('.comparison-handle');
  if (!card || !afterBox || !handle) return;

  let isDragging = false;

  function updateSlider(clientX) {
    const rect = card.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    
    const percentage = (x / rect.width) * 100;
    afterBox.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Mouse Events
  card.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  // Touch Events
  card.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });
}

/* ----------------------------------------------------
   5. Interactive Hydrophobic Simulator (Canvas Droplets)
---------------------------------------------------- */
function initHydrophobicSimulator() {
  const canvas = document.getElementById('spillCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  function resize() {
    const parent = canvas.parentElement;
    width = canvas.width = parent.clientWidth;
    height = canvas.height = parent.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Droplet color profiles
  const LIQUIDS = {
    water: {
      color: 'rgba(56, 189, 248, 0.55)',
      rim: 'rgba(255, 255, 255, 0.85)',
      highlight: 'rgba(255, 255, 255, 0.95)',
      shadow: 'rgba(0, 0, 0, 0.45)'
    },
    coffee: {
      color: 'rgba(101, 51, 19, 0.82)',
      rim: 'rgba(180, 110, 60, 0.9)',
      highlight: 'rgba(255, 220, 180, 0.9)',
      shadow: 'rgba(20, 10, 5, 0.6)'
    },
    wine: {
      color: 'rgba(136, 19, 55, 0.85)',
      rim: 'rgba(219, 39, 119, 0.9)',
      highlight: 'rgba(255, 200, 220, 0.95)',
      shadow: 'rgba(25, 4, 10, 0.6)'
    },
    chai: {
      color: 'rgba(194, 112, 45, 0.85)',
      rim: 'rgba(245, 175, 100, 0.9)',
      highlight: 'rgba(255, 245, 210, 0.95)',
      shadow: 'rgba(30, 15, 5, 0.55)'
    }
  };

  let currentLiquid = 'coffee';
  let droplets = [];
  let isPointerDown = false;
  let gravityX = 0;
  let gravityY = 0.15;

  class Droplet {
    constructor(x, y, radius, type) {
      this.x = x;
      this.y = y;
      this.radius = radius || Math.random() * 12 + 10;
      this.vx = (Math.random() - 0.5) * 3;
      this.vy = (Math.random() - 0.5) * 3;
      this.type = type || currentLiquid;
      this.profile = LIQUIDS[this.type];
      this.restitution = 0.65; // High bounce because of hydrophobic barrier
      this.friction = 0.985;
      this.contactAngle = 155; // >150° superhydrophobic bead
    }

    update() {
      this.vx += gravityX;
      this.vy += gravityY;
      
      this.vx *= this.friction;
      this.vy *= this.friction;

      this.x += this.vx;
      this.y += this.vy;

      // Bounce off walls (zero friction surface)
      if (this.x - this.radius < 0) {
        this.x = this.radius;
        this.vx *= -this.restitution;
      } else if (this.x + this.radius > width) {
        this.x = width - this.radius;
        this.vx *= -this.restitution;
      }

      if (this.y - this.radius < 0) {
        this.y = this.radius;
        this.vy *= -this.restitution;
      } else if (this.y + this.radius > height) {
        this.y = height - this.radius;
        this.vy *= -this.restitution;
        // Lotus rolling micro-bounce
        if (Math.abs(this.vy) < 0.2) this.vy = 0;
      }
    }

    draw() {
      ctx.save();
      
      // 1. Shadow underneath the suspended sphere
      ctx.beginPath();
      ctx.ellipse(this.x, this.y + this.radius * 0.75, this.radius * 0.9, this.radius * 0.35, 0, 0, Math.PI * 2);
      ctx.fillStyle = this.profile.shadow;
      ctx.filter = 'blur(4px)';
      ctx.fill();
      ctx.filter = 'none';

      // 2. Liquid body (near-perfect sphere due to surface tension)
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.profile.color;
      ctx.fill();

      // 3. Meniscus rim
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = this.profile.rim;
      ctx.stroke();

      // 4. Glossy Specular Reflection (high-tension shine)
      ctx.beginPath();
      ctx.ellipse(this.x - this.radius * 0.32, this.y - this.radius * 0.35, this.radius * 0.32, this.radius * 0.18, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = this.profile.highlight;
      ctx.fill();

      ctx.restore();
    }
  }

  // Pre-populate with a few aesthetic drops
  function seedDrops() {
    droplets = [];
    for (let i = 0; i < 9; i++) {
      droplets.push(new Droplet(
        width * 0.2 + Math.random() * width * 0.6,
        height * 0.2 + Math.random() * height * 0.4,
        Math.random() * 16 + 12,
        ['coffee', 'wine', 'water', 'chai'][i % 4]
      ));
    }
  }
  seedDrops();

  // Spawning droplets on click/drag
  function spawnAt(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    if (x >= 0 && x <= width && y >= 0 && y <= height) {
      droplets.push(new Droplet(x, y, Math.random() * 12 + 10, currentLiquid));
      // Cap at 45 droplets for 60fps performance
      if (droplets.length > 45) droplets.shift();
    }
  }

  canvas.addEventListener('mousedown', (e) => {
    isPointerDown = true;
    spawnAt(e.clientX, e.clientY);
  });

  window.addEventListener('mouseup', () => {
    isPointerDown = false;
  });

  canvas.addEventListener('mousemove', (e) => {
    // Dynamic tilt sensitivity: tilt canvas gravity slightly toward mouse!
    const rect = canvas.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / width - 0.5;
    const ny = (e.clientY - rect.top) / height - 0.5;
    gravityX = nx * 0.4;
    gravityY = ny * 0.4 + 0.1;

    if (isPointerDown) {
      spawnAt(e.clientX, e.clientY);
    }
  });

  // Touch
  canvas.addEventListener('touchstart', (e) => {
    spawnAt(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  // Liquid type selector buttons
  const liquidBtns = document.querySelectorAll('.liquid-btn');
  liquidBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      liquidBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLiquid = btn.dataset.liquid;
    });
  });

  // Clear Canvas Button
  const clearBtn = document.getElementById('clearSimBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      droplets = [];
    });
  }

  // Reset Canvas Button
  const resetBtn = document.getElementById('resetSimBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      seedDrops();
    });
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Subtle nanocoated surface micro-texture
    ctx.fillStyle = '#0b1921';
    ctx.fillRect(0, 0, width, height);

    // Subtle weave grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Merge check & updates
    for (let i = 0; i < droplets.length; i++) {
      for (let j = i + 1; j < droplets.length; j++) {
        const d1 = droplets[i];
        const d2 = droplets[j];
        const dx = d2.x - d1.x;
        const dy = d2.y - d1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Coalescence if droplets touch (surface tension merge)
        if (dist < (d1.radius + d2.radius) * 0.75) {
          const newRadius = Math.min(32, Math.sqrt(d1.radius * d1.radius + d2.radius * d2.radius));
          d1.radius = newRadius;
          d1.vx = (d1.vx + d2.vx) * 0.5;
          d1.vy = (d1.vy + d2.vy) * 0.5;
          droplets.splice(j, 1);
          j--;
        }
      }
    }

    droplets.forEach(d => {
      d.update();
      d.draw();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

/* ----------------------------------------------------
   6. Surface Showcase Tabs
---------------------------------------------------- */
function initSurfaceTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.surface-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetContent = document.getElementById(target);
      if (targetContent) targetContent.classList.add('active');
    });
  });
}

/* ----------------------------------------------------
   7. Interactive Room & Warranty Estimator
---------------------------------------------------- */
function initCalculator() {
  const roomChips = document.querySelectorAll('.calc-chip[data-room]');
  const surfaceChips = document.querySelectorAll('.calc-chip[data-surface]');
  const amountEl = document.getElementById('calcEstimatedPrice');
  const warrantyEl = document.getElementById('calcWarranty');
  const savingsEl = document.getElementById('calcSavings');

  let baseRate = 8999;
  let multiplier = 1;
  let selectedSurfacesCount = 3;

  function recalculate() {
    const total = Math.round(baseRate * multiplier * (selectedSurfacesCount * 0.35 + 0.65));
    const savings = Math.round(total * 1.8);
    
    if (amountEl) {
      amountEl.innerHTML = `<span>₹</span>${total.toLocaleString('en-IN')}`;
    }
    if (savingsEl) {
      savingsEl.textContent = `₹${savings.toLocaleString('en-IN')}`;
    }
  }

  roomChips.forEach(chip => {
    chip.addEventListener('click', () => {
      roomChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      multiplier = parseFloat(chip.dataset.multiplier) || 1;
      
      const warranty = chip.dataset.warranty || '1 Year';
      if (warrantyEl) warrantyEl.textContent = `${warranty} Full Warranty`;
      
      recalculate();
    });
  });

  surfaceChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      selectedSurfacesCount = document.querySelectorAll('.calc-chip[data-surface].active').length;
      if (selectedSurfacesCount === 0) {
        chip.classList.add('active');
        selectedSurfacesCount = 1;
      }
      recalculate();
    });
  });

  recalculate();
}

/* ----------------------------------------------------
   8. FAQ Accordion
---------------------------------------------------- */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherAnswer = other.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ----------------------------------------------------
   9. Booking & Consultation Modal
---------------------------------------------------- */
function initBookingModal() {
  const modal = document.getElementById('bookingModal');
  const openBtns = document.querySelectorAll('[data-open-modal="bookingModal"]');
  const closeBtn = document.querySelector('.modal-close-btn');
  const form = document.getElementById('bookingForm');

  function openModal() {
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Securing Slot...';

      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align: center; padding: 24px 0;">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(45, 212, 191, 0.2); color: #2dd4bf; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 1.8rem;">✓</div>
            <h3 style="font-size: 1.5rem; margin-bottom: 8px;">Consultation Confirmed!</h3>
            <p style="color: #94a3b8; font-size: 0.95rem;">Our Senior Surface Specialist will reach out via WhatsApp/Call within 15 minutes with your bespoke protection plan.</p>
            <button class="btn btn-secondary btn-sm" style="margin-top: 24px;" onclick="location.reload()">Done</button>
          </div>
        `;
      }, 1000);
    });
  }
}

/* ----------------------------------------------------
   10. Scroll Stagger Reveals
---------------------------------------------------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

/* ----------------------------------------------------
   11. Product Category Filter
---------------------------------------------------- */
function initProductFilters() {
  const filterBtns = document.querySelectorAll('.product-filter-btn');
  const cards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const category = card.dataset.category || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ----------------------------------------------------
   12. Interactive Shopping Cart Drawer
---------------------------------------------------- */
function initCart() {
  let cart = [];
  const openCartBtn = document.getElementById('openCartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  const countBadge = document.getElementById('cartCountBadge');
  const drawerCount = document.getElementById('cartDrawerCount');
  const drawerBody = document.getElementById('cartDrawerBody');
  const drawerFooter = document.getElementById('cartDrawerFooter');
  const subtotalEl = document.getElementById('cartSubtotal');
  const toast = document.getElementById('cartToast');
  const toastMsg = document.getElementById('cartToastMsg');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const emptyCartShopBtn = document.getElementById('emptyCartShopBtn');

  function openCart() {
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openCartBtn) openCartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeCart();
    });
  }
  if (emptyCartShopBtn) {
    emptyCartShopBtn.addEventListener('click', closeCart);
  }

  function showToast(title) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = `Added "${title}" to cart!`;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 2400);
  }

  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (countBadge) countBadge.textContent = totalItems;
    if (drawerCount) drawerCount.textContent = totalItems;
    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

    if (cart.length === 0) {
      if (drawerBody) {
        drawerBody.innerHTML = `
          <div class="cart-empty-message">
            <div style="font-size: 2.5rem; opacity: 0.3; margin-bottom: 12px;">🛒</div>
            <p>Your cart is currently empty.</p>
            <a href="#products" class="btn btn-secondary btn-sm" style="margin-top: 14px;" onclick="document.getElementById('cartOverlay').classList.remove('active'); document.body.style.overflow='';">Explore Protectors</a>
          </div>
        `;
      }
      if (drawerFooter) drawerFooter.style.display = 'none';
    } else {
      if (drawerFooter) drawerFooter.style.display = 'block';
      if (drawerBody) {
        drawerBody.innerHTML = cart.map(item => `
          <div class="cart-item-row" data-id="${item.id}">
            <img src="${item.img}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-info">
              <h4 class="cart-item-title">${item.title}</h4>
              <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')} × ${item.qty}</div>
            </div>
            <button class="cart-item-remove" data-remove="${item.id}" title="Remove item">
              ✕
            </button>
          </div>
        `).join('');

        // Wire remove buttons
        drawerBody.querySelectorAll('[data-remove]').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.dataset.remove;
            cart = cart.filter(x => x.id !== id);
            updateCartUI();
          });
        });
      }
    }
  }

  // Add to cart buttons on products
  const addButtons = document.querySelectorAll('.btn-add-cart');
  addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const title = btn.dataset.title;
      const price = parseInt(btn.dataset.price, 10);
      const img = btn.dataset.img;

      const existing = cart.find(x => x.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ id, title, price, img, qty: 1 });
      }

      updateCartUI();
      showToast(title);
      
      // Haptic bounce effect on nav cart icon
      if (countBadge) {
        countBadge.style.transform = 'scale(1.4)';
        setTimeout(() => { countBadge.style.transform = 'scale(1)'; }, 200);
      }
    });
  });

  // Checkout button simulation
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      checkoutBtn.disabled = true;
      checkoutBtn.innerHTML = 'Connecting to Secure Gateway...';

      setTimeout(() => {
        alert('Thank you! In production, this connects to Razorpay / Cashfree / Gokwik for instant 1-click checkout with Free Express Shipping.');
        checkoutBtn.disabled = false;
        checkoutBtn.innerHTML = '<span>Proceed To Checkout</span>';
      }, 800);
    });
  }
}

/* ----------------------------------------------------
   13. Pinterest Hero Swatches & Size Toggles
---------------------------------------------------- */
function initPinterestHero() {
  const swatches = document.querySelectorAll('.swatch-circle');
  const sizeBtns = document.querySelectorAll('.size-pill-circle');
  const giantWord = document.getElementById('heroGiantWord');
  const mainTitle = document.getElementById('heroMainTitle');
  const subDesc = document.getElementById('heroSubDesc');
  const subjectImg = document.getElementById('heroSubjectImg');
  const floatingSubject = document.getElementById('floatingHeroSubject');

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      const word = swatch.dataset.word;
      const title = swatch.dataset.title;
      const desc = swatch.dataset.desc;
      const img = swatch.dataset.img;

      if (giantWord) {
        giantWord.style.opacity = '0';
        giantWord.style.transform = 'translate(-50%, -50%) scale(0.92)';
        setTimeout(() => {
          giantWord.textContent = word;
          giantWord.style.opacity = '0.2';
          giantWord.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 200);
      }

      if (mainTitle) {
        mainTitle.style.opacity = '0';
        setTimeout(() => {
          mainTitle.innerHTML = title;
          mainTitle.style.opacity = '1';
        }, 150);
      }

      if (subDesc) {
        subDesc.style.opacity = '0';
        setTimeout(() => {
          subDesc.textContent = desc;
          subDesc.style.opacity = '1';
        }, 150);
      }

      if (subjectImg) {
        subjectImg.style.opacity = '0';
        subjectImg.style.transform = 'scale(0.95)';
        setTimeout(() => {
          subjectImg.src = img;
          subjectImg.style.opacity = '1';
          subjectImg.style.transform = 'scale(1)';
        }, 200);
      }
    });
  });

  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Dynamic Mouse Parallax on floating hero subject
  if (floatingSubject) {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;

        floatingSubject.style.transform = `perspective(1000px) rotateX(${-ny * 16}deg) rotateY(${nx * 20}deg) rotate(-6deg) translateY(${ny * -15}px)`;
      });

      heroSection.addEventListener('mouseleave', () => {
        floatingSubject.style.transform = 'perspective(1000px) rotate(-6deg) rotateY(-4deg)';
      });
    }
  }
}


