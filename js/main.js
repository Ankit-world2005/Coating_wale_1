/* ===================================================================
   INVISEL™ × WONDER THEME INTERIOR - MAIN JAVASCRIPT
   Interactions, Cart Drawer, Lookbook Hotspots, Hydrophobic Simulator,
   Hero Slideshow, Tabs, and Quick View
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Lucide Icons initialization
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* =========================================================
     1. CATALOG DATA & STATE
     ========================================================= */
  const PRODUCTS = [
    {
      id: 'inv-fabric-shield',
      name: 'Invisel™ Hydrophobic Fabric & Boucle Shield',
      category: 'fabric',
      categoryLabel: 'Living Room & Upholstery',
      price: 1899,
      comparePrice: 2499,
      badge: 'Bestseller',
      badgeType: 'bestseller',
      rating: 4.9,
      reviewsCount: 142,
      primaryImage: 'assets/images/hero-sofa.jpg',
      secondaryImage: 'assets/images/macro-liquid.jpg',
      description: 'Medical-grade SiO2 nanocoating for curved boucle sofas, velvet armchairs, suede drapes, and dining fabric. 100% invisible and breathable with zero stiffness.',
      coverage: 'Covers up to 120 sq. ft (Full 3-Seater Sofa + 2 Armchairs)',
      variants: [
        { size: '250ml Spray', price: 1299, comparePrice: 1699 },
        { size: '500ml Pro', price: 1899, comparePrice: 2499, default: true },
        { size: '1L Refill', price: 3299, comparePrice: 4299 }
      ]
    },
    {
      id: 'inv-marble-armor',
      name: 'Invisel™ Calacatta & Honed Marble Armor',
      category: 'marble',
      categoryLabel: 'Dining & Natural Stone',
      price: 2199,
      comparePrice: 2899,
      badge: 'Trending',
      badgeType: 'trending',
      rating: 5.0,
      reviewsCount: 98,
      primaryImage: 'assets/images/marble-glass.jpg',
      secondaryImage: 'assets/images/technician.jpg',
      description: 'Invisible penetrating barrier for Italian marble, quartzite, granite, and travertine. Repels red wine, coffee, oils, turmeric, and acid etching without altering natural sheen.',
      coverage: 'Covers up to 150 sq. ft (8-Seater Dining Table + Island Counter)',
      variants: [
        { size: '250ml Spray', price: 1499, comparePrice: 1999 },
        { size: '500ml Pro', price: 2199, comparePrice: 2899, default: true },
        { size: '1L Refill', price: 3799, comparePrice: 4999 }
      ]
    },
    {
      id: 'inv-glass-barrier',
      name: 'Invisel™ Crystal Clear Glass & Shower Guard',
      category: 'glass',
      categoryLabel: 'Bath & Architectural Glass',
      price: 1499,
      comparePrice: 1999,
      badge: 'Eco Friendly',
      badgeType: 'eco',
      rating: 4.8,
      reviewsCount: 76,
      primaryImage: 'assets/images/marble-glass.jpg',
      secondaryImage: 'assets/images/macro-liquid.jpg',
      description: 'Ultra-slick hydrophobic glass sealant. Prevents water spots, limescale buildup, soap scum, and fog on frameless shower glass, mirrors, and floor-to-ceiling glass partitions.',
      coverage: 'Covers up to 200 sq. ft (2 Full Shower Enclosures + Mirrors)',
      variants: [
        { size: '250ml Spray', price: 1099, comparePrice: 1499 },
        { size: '500ml Pro', price: 1499, comparePrice: 1999, default: true },
        { size: '1L Refill', price: 2599, comparePrice: 3499 }
      ]
    },
    {
      id: 'inv-leather-wood',
      name: 'Invisel™ Top-Grain Leather & Timber Glaze',
      category: 'fabric',
      categoryLabel: 'Leather & Handcrafted Wood',
      price: 1999,
      comparePrice: 2599,
      badge: 'Limited',
      badgeType: 'limited',
      rating: 4.9,
      reviewsCount: 64,
      primaryImage: 'assets/images/hero-sofa.jpg',
      secondaryImage: 'assets/images/technician.jpg',
      description: 'Deep conditioning ceramic nano-sealant for aniline leather, nubuck, oak, and teak wood. Blocks UV fading, dye transfer from jeans, and liquid seepage while nourishing fibers.',
      coverage: 'Covers up to 100 sq. ft (2 Leather Lounge Chairs or King Headboard)',
      variants: [
        { size: '250ml Spray', price: 1399, comparePrice: 1799 },
        { size: '500ml Pro', price: 1999, comparePrice: 2599, default: true },
        { size: '1L Refill', price: 3499, comparePrice: 4499 }
      ]
    },
    {
      id: 'inv-master-bundle',
      name: 'The Full Interior Sanctuary™ Master Kit',
      category: 'bundles',
      categoryLabel: 'Complete Home Suite',
      price: 4999,
      comparePrice: 6899,
      badge: 'Sale',
      badgeType: 'sale',
      rating: 5.0,
      reviewsCount: 215,
      primaryImage: 'assets/images/invisel-lineup.jpg',
      secondaryImage: 'assets/images/macro-liquid.jpg',
      description: 'Complete 4-bottle luxury care arsenal: Fabric & Boucle Shield (500ml), Marble Armor (500ml), Glass Guard (500ml), and Leather Glaze (500ml) with 4 microfiber applicators.',
      coverage: 'Complete 3BHK / 4BHK Luxury Apartment Surface Protection',
      variants: [
        { size: 'Pro Set (4x 500ml)', price: 4999, comparePrice: 6899, default: true },
        { size: 'Estate Villa Set (4x 1L)', price: 8499, comparePrice: 11999 }
      ]
    },
    {
      id: 'inv-rug-carpet',
      name: 'Invisel™ Deep-Fiber Wool Rug & Carpet Guard',
      category: 'fabric',
      categoryLabel: 'Textiles & Rugs',
      price: 1699,
      comparePrice: 2299,
      badge: 'Trending',
      badgeType: 'trending',
      rating: 4.8,
      reviewsCount: 53,
      primaryImage: 'assets/images/hero-sofa.jpg',
      secondaryImage: 'assets/images/uncoated-stain.jpg',
      description: 'Penetrating nano barrier for hand-knotted Persian rugs, Kashmiri silk carpets, and high-traffic sisal runners. Liquid spills form beads on surface fibers for effortless wipe-off.',
      coverage: 'Covers up to 160 sq. ft (Large 9x12 Living Room Area Rug)',
      variants: [
        { size: '500ml Pro', price: 1699, comparePrice: 2299, default: true },
        { size: '1L Refill', price: 2999, comparePrice: 3999 }
      ]
    },
    {
      id: 'inv-countertop-shield',
      name: 'Invisel™ Kitchen Quartz & Granite Bio-Pel',
      category: 'marble',
      categoryLabel: 'Culinary Surfaces',
      price: 1899,
      comparePrice: 2499,
      badge: 'Eco Friendly',
      badgeType: 'eco',
      rating: 4.9,
      reviewsCount: 89,
      primaryImage: 'assets/images/marble-glass.jpg',
      secondaryImage: 'assets/images/technician.jpg',
      description: 'Food-safe certified oleophobic nanocoating for cooking islands and dining counters. Resists hot oil splatters, mustard, beetroot, and spice stains without toxic sealers.',
      coverage: 'Covers up to 120 sq. ft (Standard Kitchen Island + Backsplash)',
      variants: [
        { size: '250ml Spray', price: 1299, comparePrice: 1699 },
        { size: '500ml Pro', price: 1899, comparePrice: 2499, default: true }
      ]
    },
    {
      id: 'inv-outdoor-patio',
      name: 'Invisel™ Weather-Proof Patio & Teak Shield',
      category: 'bundles',
      categoryLabel: 'Balcony & Outdoor Living',
      price: 2499,
      comparePrice: 3299,
      badge: 'Limited',
      badgeType: 'limited',
      rating: 4.9,
      reviewsCount: 41,
      primaryImage: 'assets/images/invisel-lineup.jpg',
      secondaryImage: 'assets/images/macro-liquid.jpg',
      description: 'High-UV resistance coating formulated for exterior Sunbrella fabrics, rattan furniture, and outdoor deck stone. Repels torrential monsoon rains, bird droppings, and algae.',
      coverage: 'Covers up to 180 sq. ft (Outdoor Sectional + 6 Deck Chairs)',
      variants: [
        { size: '500ml Pro', price: 2499, comparePrice: 3299, default: true },
        { size: '1L Refill', price: 4199, comparePrice: 5499 }
      ]
    }
  ];

  let cart = JSON.parse(localStorage.getItem('wt_invisel_cart') || '[]');
  let currency = localStorage.getItem('wt_invisel_currency') || 'INR';
  const CURRENCY_RATES = { INR: 1, USD: 0.012 };
  const CURRENCY_SYMBOLS = { INR: '₹', USD: '$' };
  const FREE_SHIPPING_THRESHOLD = 999;

  function formatPrice(amountInINR) {
    if (currency === 'USD') {
      const usd = Math.round(amountInINR * CURRENCY_RATES.USD);
      return `$${usd}`;
    }
    return `₹${amountInINR.toLocaleString('en-IN')}`;
  }

  function saveCart() {
    localStorage.setItem('wt_invisel_cart', JSON.stringify(cart));
    updateCartUI();
  }

  function showToast(message) {
    let toast = document.getElementById('wtToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'wtToast';
      toast.className = 'wt-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i data-lucide="check-circle" style="width: 18px; height: 18px;"></i> <span>${message}</span>`;
    if (window.lucide) window.lucide.createIcons();
    toast.classList.add('is-active');
    setTimeout(() => {
      toast.classList.remove('is-active');
    }, 3200);
  }

  /* =========================================================
     2. STICKY HEADER SCROLL LISTENER
     ========================================================= */
  const headerWrapper = document.querySelector('.wt-header-sticky-wrapper');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      headerWrapper?.classList.add('is-scrolled');
    } else {
      headerWrapper?.classList.remove('is-scrolled');
    }
  });

  /* =========================================================
     3. HERO SLIDESHOW (Shopify Wonder Theme Style)
     ========================================================= */
  const heroSlider = document.getElementById('heroSlider');
  const heroTrack = document.getElementById('heroTrack');
  const heroSlides = document.querySelectorAll('.wt-hero-slide');
  const heroIndicator = document.getElementById('heroSlideIndicator');
  const heroPrevBtn = document.getElementById('heroPrevBtn');
  const heroNextBtn = document.getElementById('heroNextBtn');

  let currentSlide = 0;
  let heroInterval = null;

  function updateHeroSlide(index) {
    if (!heroTrack || heroSlides.length === 0) return;
    currentSlide = (index + heroSlides.length) % heroSlides.length;
    heroTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    heroSlides.forEach((slide, idx) => {
      slide.classList.toggle('is-active', idx === currentSlide);
    });

    if (heroIndicator) {
      heroIndicator.textContent = `0${currentSlide + 1} / 0${heroSlides.length}`;
    }
  }

  function startHeroAuto() {
    stopHeroAuto();
    heroInterval = setInterval(() => {
      updateHeroSlide(currentSlide + 1);
    }, 6500);
  }

  function stopHeroAuto() {
    if (heroInterval) clearInterval(heroInterval);
  }

  if (heroSlider) {
    heroSlider.addEventListener('mouseenter', stopHeroAuto);
    heroSlider.addEventListener('mouseleave', startHeroAuto);

    heroPrevBtn?.addEventListener('click', () => {
      updateHeroSlide(currentSlide - 1);
      startHeroAuto();
    });

    heroNextBtn?.addEventListener('click', () => {
      updateHeroSlide(currentSlide + 1);
      startHeroAuto();
    });

    startHeroAuto();
  }

  /* =========================================================
     4. RENDER FEATURED PRODUCTS & TAB FILTERING
     ========================================================= */
  const productGrid = document.getElementById('productGrid');
  const tabButtons = document.querySelectorAll('.wt-tab-btn');

  function renderProducts(filter = 'all') {
    if (!productGrid) return;
    productGrid.innerHTML = '';

    const filtered = filter === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === filter);

    filtered.forEach(p => {
      const defaultVariant = p.variants.find(v => v.default) || p.variants[0];
      const card = document.createElement('div');
      card.className = 'wt-product-card';
      card.dataset.productId = p.id;

      card.innerHTML = `
        <div class="wt-product-media">
          <span class="wt-product-badge wt-badge--${p.badgeType}">${p.badge}</span>
          <img src="${p.primaryImage}" alt="${p.name}" class="wt-product-img" loading="lazy">
          <img src="${p.secondaryImage}" alt="${p.name} In Use" class="wt-product-img wt-product-img--hover" loading="lazy">
          <button class="wt-product-quick-view" data-quick-view="${p.id}">Quick View</button>
        </div>
        <div class="wt-product-info">
          <span class="wt-product-category">${p.categoryLabel}</span>
          <h3 class="wt-product-title">${p.name}</h3>
          
          <div class="wt-product-rating">
            <span class="wt-stars">
              ${'★'.repeat(Math.floor(p.rating))}
            </span>
            <span>${p.rating} (${p.reviewsCount} reviews)</span>
          </div>

          <div class="wt-swatches">
            ${p.variants.map((v, idx) => `
              <button class="wt-swatch-chip ${idx === 0 || v.default ? 'is-selected' : ''}" 
                      data-variant-size="${v.size}"
                      data-variant-price="${v.price}"
                      data-variant-compare="${v.comparePrice}">
                ${v.size}
              </button>
            `).join('')}
          </div>

          <div class="wt-product-footer">
            <div class="wt-price-box">
              <span class="wt-price-current">${formatPrice(defaultVariant.price)}</span>
              <span class="wt-price-compare">${formatPrice(defaultVariant.comparePrice)}</span>
            </div>
            <button class="wt-add-btn" aria-label="Add to bag" data-add-to-cart="${p.id}">
              <i data-lucide="plus" style="width: 18px; height: 18px;"></i>
            </button>
          </div>
        </div>
      `;

      productGrid.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
    attachCardListeners();
  }

  function attachCardListeners() {
    // Swatch selector within card
    document.querySelectorAll('.wt-product-card').forEach(card => {
      const swatches = card.querySelectorAll('.wt-swatch-chip');
      const priceElem = card.querySelector('.wt-price-current');
      const compareElem = card.querySelector('.wt-price-compare');

      swatches.forEach(chip => {
        chip.addEventListener('click', (e) => {
          e.stopPropagation();
          swatches.forEach(s => s.classList.remove('is-selected'));
          chip.classList.add('is-selected');

          const newPrice = Number(chip.dataset.variantPrice);
          const newCompare = Number(chip.dataset.variantCompare);
          priceElem.textContent = formatPrice(newPrice);
          compareElem.textContent = formatPrice(newCompare);
        });
      });
    });

    // Add to cart buttons
    document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.dataset.addToCart;
        const card = btn.closest('.wt-product-card');
        const selectedChip = card ? card.querySelector('.wt-swatch-chip.is-selected') : null;
        const size = selectedChip ? selectedChip.dataset.variantSize : 'Standard';
        const price = selectedChip ? Number(selectedChip.dataset.variantPrice) : null;
        addToCart(pId, size, price);
      });
    });

    // Quick View buttons
    document.querySelectorAll('[data-quick-view]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = btn.dataset.quickView;
        openQuickView(pId);
      });
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      renderProducts(btn.dataset.category);
    });
  });

  /* =========================================================
     5. CART DRAWER OPERATIONS
     ========================================================= */
  const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
  const openCartBtn = document.getElementById('openCartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartSubtotalElem = document.getElementById('cartSubtotal');
  const cartBadgeElem = document.getElementById('cartBadge');
  const shippingMeterFill = document.getElementById('shippingMeterFill');
  const shippingMeterText = document.getElementById('shippingMeterText');
  const checkoutBtn = document.getElementById('checkoutBtn');

  function openCartDrawer() {
    cartDrawerOverlay?.classList.add('is-active');
  }

  function closeCartDrawer() {
    cartDrawerOverlay?.classList.remove('is-active');
  }

  openCartBtn?.addEventListener('click', openCartDrawer);
  closeCartBtn?.addEventListener('click', closeCartDrawer);
  cartDrawerOverlay?.addEventListener('click', (e) => {
    if (e.target === cartDrawerOverlay) closeCartDrawer();
  });

  function addToCart(productId, size = null, customPrice = null) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const variant = product.variants.find(v => v.size === size) || product.variants[0];
    const finalSize = size || variant.size;
    const finalPrice = customPrice || variant.price;

    const existingIndex = cart.findIndex(item => item.id === productId && item.size === finalSize);
    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        size: finalSize,
        price: finalPrice,
        image: product.primaryImage,
        qty: 1
      });
    }

    saveCart();
    showToast(`Added ${product.name} (${finalSize}) to your bag`);
    openCartDrawer();
  }

  function updateCartUI() {
    const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    if (cartBadgeElem) {
      cartBadgeElem.textContent = totalCount;
      cartBadgeElem.style.display = totalCount > 0 ? 'flex' : 'none';
    }

    if (cartSubtotalElem) {
      cartSubtotalElem.textContent = formatPrice(subtotal);
    }

    // Free shipping calculation
    if (shippingMeterFill && shippingMeterText) {
      const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
      const percentage = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
      shippingMeterFill.style.width = `${percentage}%`;

      if (subtotal === 0) {
        shippingMeterText.innerHTML = `Add <strong>${formatPrice(FREE_SHIPPING_THRESHOLD)}</strong> to unlock Free Express Delivery across India`;
      } else if (remaining > 0) {
        shippingMeterText.innerHTML = `Add <strong>${formatPrice(remaining)}</strong> more to enjoy Free White-Glove Shipping!`;
      } else {
        shippingMeterText.innerHTML = `<span style="color: #2b7a2b;">🎉 You unlocked Free Express White-Glove Shipping!</span>`;
      }
    }

    // Render items
    if (!cartItemsContainer) return;
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="wt-cart-empty-state">
          <i data-lucide="shopping-bag" style="width: 44px; height: 44px; opacity: 0.3; margin: 0 auto;"></i>
          <p>Your shopping bag is currently empty.</p>
          <button class="wt-btn wt-btn-secondary wt-btn-sm" style="margin-top: 14px;" id="emptyCartShopBtn">
            Explore Nano Protection
          </button>
        </div>
      `;
      document.getElementById('emptyCartShopBtn')?.addEventListener('click', () => {
        closeCartDrawer();
        document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="wt-cart-item">
          <img src="${item.image}" alt="${item.name}" class="wt-cart-item-img">
          <div class="wt-cart-item-info">
            <h4 class="wt-cart-item-title">${item.name}</h4>
            <span class="wt-cart-item-variant">${item.size}</span>
            <div class="wt-cart-item-row">
              <div class="wt-qty-selector">
                <button class="wt-qty-btn" data-cart-qty-dec="${index}">-</button>
                <span class="wt-qty-val">${item.qty}</span>
                <button class="wt-qty-btn" data-cart-qty-inc="${index}">+</button>
              </div>
              <span class="wt-cart-item-price">${formatPrice(item.price * item.qty)}</span>
            </div>
            <span class="wt-cart-remove-btn" data-cart-remove="${index}">Remove</span>
          </div>
        </div>
      `).join('');

      // Cart item quantity events
      cartItemsContainer.querySelectorAll('[data-cart-qty-dec]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.dataset.cartQtyDec);
          if (cart[idx].qty > 1) {
            cart[idx].qty -= 1;
          } else {
            cart.splice(idx, 1);
          }
          saveCart();
        });
      });

      cartItemsContainer.querySelectorAll('[data-cart-qty-inc]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.dataset.cartQtyInc);
          cart[idx].qty += 1;
          saveCart();
        });
      });

      cartItemsContainer.querySelectorAll('[data-cart-remove]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.dataset.cartRemove);
          cart.splice(idx, 1);
          saveCart();
        });
      });
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // Simulated Checkout
  checkoutBtn?.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items to proceed.');
      return;
    }
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const orderRef = 'CW-' + Math.floor(100000 + Math.random() * 900000);
    alert(`Order Initiated #${orderRef}\n\nTotal Payable: ${formatPrice(subtotal)}\nComplimentary Express Delivery Included.\n\nThank you for choosing COATINGWALE™ Smart Coatings!`);
    cart = [];
    saveCart();
    closeCartDrawer();
  });

  /* =========================================================
     6. SHOP THE ROOM (LOOKBOOK HOTSPOTS)
     ========================================================= */
  const hotspotDots = document.querySelectorAll('.wt-hotspot');
  hotspotDots.forEach(spot => {
    spot.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = spot.classList.contains('is-open');
      hotspotDots.forEach(s => s.classList.remove('is-open'));
      if (!wasOpen) spot.classList.add('is-open');
    });

    const addBtn = spot.querySelector('.wt-hotspot-btn');
    addBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = addBtn.dataset.productId;
      addToCart(pId);
      spot.classList.remove('is-open');
    });
  });

  document.addEventListener('click', () => {
    hotspotDots.forEach(s => s.classList.remove('is-open'));
  });

  /* =========================================================
     7. HYDROPHOBIC SPILL SIMULATOR (SLIDER)
     ========================================================= */
  const simBox = document.getElementById('simBox');
  const simOverlay = document.getElementById('simOverlay');
  const simHandle = document.getElementById('simHandle');

  if (simBox && simOverlay && simHandle) {
    let isDragging = false;

    function setSimulatorPosition(clientX) {
      const rect = simBox.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      offsetX = Math.max(0, Math.min(rect.width, offsetX));
      const percentage = (offsetX / rect.width) * 100;

      simOverlay.style.width = `${percentage}%`;
      simHandle.style.left = `${percentage}%`;
    }

    simHandle.addEventListener('mousedown', () => { isDragging = true; });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (isDragging) setSimulatorPosition(e.clientX);
    });

    simHandle.addEventListener('touchstart', () => { isDragging = true; });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches[0]) {
        setSimulatorPosition(e.touches[0].clientX);
      }
    });

    simBox.addEventListener('click', (e) => {
      setSimulatorPosition(e.clientX);
    });
  }

  /* =========================================================
     8. QUICK VIEW MODAL
     ========================================================= */
  const quickViewModal = document.getElementById('quickViewModal');
  const quickViewClose = document.getElementById('quickViewClose');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalPrice = document.getElementById('modalPrice');
  const modalComparePrice = document.getElementById('modalComparePrice');
  const modalDesc = document.getElementById('modalDesc');
  const modalCoverage = document.getElementById('modalCoverage');
  const modalSwatches = document.getElementById('modalSwatches');
  const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');

  let activeModalProductId = null;
  let activeModalSize = null;
  let activeModalPrice = null;

  function openQuickView(productId) {
    const p = PRODUCTS.find(prod => prod.id === productId);
    if (!p || !quickViewModal) return;

    activeModalProductId = p.id;
    const defaultVariant = p.variants.find(v => v.default) || p.variants[0];
    activeModalSize = defaultVariant.size;
    activeModalPrice = defaultVariant.price;

    if (modalImg) modalImg.src = p.primaryImage;
    if (modalTitle) modalTitle.textContent = p.name;
    if (modalCategory) modalCategory.textContent = p.categoryLabel;
    if (modalPrice) modalPrice.textContent = formatPrice(defaultVariant.price);
    if (modalComparePrice) modalComparePrice.textContent = formatPrice(defaultVariant.comparePrice);
    if (modalDesc) modalDesc.textContent = p.description;
    if (modalCoverage) modalCoverage.textContent = p.coverage;

    if (modalSwatches) {
      modalSwatches.innerHTML = p.variants.map((v, idx) => `
        <button class="wt-swatch-chip ${idx === 0 || v.default ? 'is-selected' : ''}" 
                data-modal-size="${v.size}"
                data-modal-price="${v.price}"
                data-modal-compare="${v.comparePrice}">
          ${v.size}
        </button>
      `).join('');

      modalSwatches.querySelectorAll('.wt-swatch-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          modalSwatches.querySelectorAll('.wt-swatch-chip').forEach(s => s.classList.remove('is-selected'));
          chip.classList.add('is-selected');

          activeModalSize = chip.dataset.modalSize;
          activeModalPrice = Number(chip.dataset.modalPrice);
          const compareVal = Number(chip.dataset.modalCompare);

          if (modalPrice) modalPrice.textContent = formatPrice(activeModalPrice);
          if (modalComparePrice) modalComparePrice.textContent = formatPrice(compareVal);
        });
      });
    }

    quickViewModal.classList.add('is-active');
  }

  function closeQuickView() {
    quickViewModal?.classList.remove('is-active');
  }

  quickViewClose?.addEventListener('click', closeQuickView);
  quickViewModal?.addEventListener('click', (e) => {
    if (e.target === quickViewModal) closeQuickView();
  });

  modalAddToCartBtn?.addEventListener('click', () => {
    if (activeModalProductId) {
      addToCart(activeModalProductId, activeModalSize, activeModalPrice);
      closeQuickView();
    }
  });

  /* =========================================================
     9. SEARCH DRAWER & FILTERING
     ========================================================= */
  const searchDrawer = document.getElementById('searchDrawer');
  const searchToggleBtn = document.getElementById('searchToggleBtn');
  const searchCloseBtn = document.getElementById('searchCloseBtn');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  searchToggleBtn?.addEventListener('click', () => {
    searchDrawer?.classList.toggle('is-active');
    if (searchDrawer?.classList.contains('is-active')) {
      searchInput?.focus();
    }
  });

  searchCloseBtn?.addEventListener('click', () => {
    searchDrawer?.classList.remove('is-active');
  });

  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!searchResults) return;

    if (!query) {
      searchResults.innerHTML = '';
      return;
    }

    const matches = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.categoryLabel.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      searchResults.innerHTML = `<div style="grid-column: 1 / -1; padding: 12px; color: #888;">No matching surface protection solutions found for "${query}"</div>`;
    } else {
      searchResults.innerHTML = matches.map(p => `
        <div style="display: flex; gap: 10px; padding: 10px; border: 1px solid var(--color-border); align-items: center; background: #faf8f5; border-radius: 4px; cursor: pointer;" onclick="window.wtOpenQuickView('${p.id}')">
          <img src="${p.primaryImage}" style="width: 48px; height: 48px; object-fit: cover; border-radius: 2px;">
          <div>
            <div style="font-size: 13px; font-weight: 600;">${p.name}</div>
            <div style="font-size: 12px; color: #1e1b18; font-weight: 700;">${formatPrice(p.price)}</div>
          </div>
        </div>
      `).join('');
    }
  });

  window.wtOpenQuickView = (pId) => {
    searchDrawer?.classList.remove('is-active');
    openQuickView(pId);
  };

  /* =========================================================
     10. CURRENCY CONVERTER TOGGLE
     ========================================================= */
  const currencyToggleBtn = document.getElementById('currencyToggleBtn');
  currencyToggleBtn?.addEventListener('click', () => {
    currency = currency === 'INR' ? 'USD' : 'INR';
    localStorage.setItem('wt_invisel_currency', currency);
    currencyToggleBtn.innerHTML = currency === 'INR' ? `🇮🇳 INR ₹` : `🇺🇸 USD $`;
    renderProducts(document.querySelector('.wt-tab-btn.is-active')?.dataset.category || 'all');
    updateCartUI();
    showToast(`Switched currency to ${currency}`);
  });

  /* =========================================================
     11. MOBILE DRAWER NAVIGATION
     ========================================================= */
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');

  mobileToggleBtn?.addEventListener('click', () => {
    mobileDrawer?.classList.add('is-active');
  });

  mobileCloseBtn?.addEventListener('click', () => {
    mobileDrawer?.classList.remove('is-active');
  });

  mobileDrawer?.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) mobileDrawer.classList.remove('is-active');
  });

  document.querySelectorAll('.wt-mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer?.classList.remove('is-active');
    });
  });

  /* =========================================================
     12. NEWSLETTER FORM
     ========================================================= */
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletterEmail');
    if (emailInput && emailInput.value) {
      showToast(`Welcome to the Care Circle! Your 10% coupon code is WONDER10`);
      emailInput.value = '';
    }
  });

  // Initial render
  renderProducts('all');
  updateCartUI();
});
