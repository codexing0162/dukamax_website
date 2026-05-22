// ── STATE ───────────────────────────────────────────────
let allProducts   = [];
let filteredProds = [];
let cart          = [];
let categories    = [];
let activeCatId   = null;
let modalProduct  = null;
let modalQty      = 1;
let shopSettings  = {};

// ── INIT ────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('footer-year').textContent = new Date().getFullYear();
  await Promise.all([loadSettings(), loadCategories(), loadProducts()]);
});

// ── SETTINGS ────────────────────────────────────────────
async function loadSettings() {
  try {
    const res = await fetch(`${CONFIG.API_URL}/api/public/settings`);
    shopSettings = res.ok ? await res.json() : {};
    const name = shopSettings.shop_name || CONFIG.SHOP_NAME;
    document.title = `${name} — Online Shop`;
    document.getElementById('page-title').textContent = `${name} — Online Shop`;
    document.getElementById('header-shop-name').textContent = name;
    document.getElementById('hero-shop-name').textContent   = name;
    document.getElementById('footer-name').textContent      = name;
    if (shopSettings.shop_phone) document.getElementById('contact-phone').textContent = shopSettings.shop_phone;
    if (shopSettings.shop_address) document.getElementById('contact-address').textContent = shopSettings.shop_address;
    const waNum = shopSettings.whatsapp_number || CONFIG.WHATSAPP_NUMBER;
    document.getElementById('wa-contact-link').href = `https://wa.me/${waNum}`;
  } catch (e) { /* fallback to defaults */ }
}

// ── CATEGORIES ──────────────────────────────────────────
async function loadCategories() {
  try {
    const res = await fetch(`${CONFIG.API_URL}/api/public/categories`);
    categories = res.ok ? await res.json() : [];
    const pills = document.getElementById('cat-pills');
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'cat-pill';
      btn.innerHTML = `<span class="material-icons" style="font-size:16px">${cat.icon || 'category'}</span> ${cat.name}`;
      btn.onclick = () => filterCategory(cat.id, btn);
      pills.appendChild(btn);
    });
  } catch (e) { /* no categories */ }
}

// ── PRODUCTS ────────────────────────────────────────────
async function loadProducts() {
  try {
    const res = await fetch(`${CONFIG.API_URL}/api/public/products`);
    if (!res.ok) throw new Error('API error');
    allProducts = await res.json();
    filteredProds = [...allProducts];
    renderProducts(filteredProds);
  } catch (e) {
    document.getElementById('products-grid').innerHTML =
      `<div style="grid-column:1/-1;text-align:center;color:#999;padding:60px 0">
        <span class="material-icons" style="font-size:48px;display:block;margin-bottom:12px;opacity:.3">wifi_off</span>
        Imeshindwa kupakia bidhaa. Hakikisha server inafanya kazi.
       </div>`;
  }
}

function renderProducts(products) {
  const grid  = document.getElementById('products-grid');
  const empty = document.getElementById('empty-state');
  grid.innerHTML = '';
  if (!products.length) { empty.style.display = 'flex'; return; }
  empty.style.display = 'none';
  products.forEach(p => grid.appendChild(createCard(p)));
}

function createCard(p) {
  const currency = shopSettings.currency || CONFIG.CURRENCY;
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    ${p.image_url
      ? `<img class="card-image" src="${getImageUrl(p.image_url)}" alt="${p.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=card-image-placeholder><span class=material-icons>image_not_supported</span></div>'">`
      : `<div class="card-image-placeholder"><span class="material-icons">inventory_2</span></div>`}
    <div class="card-body">
      <div class="card-category">${p.category_name || 'Bidhaa'}</div>
      <div class="card-name">${p.name}</div>
      <div class="card-price">${currency} ${formatNum(p.price)}</div>
      <div class="card-actions">
        ${p.allow_wa_order
          ? `<button class="btn-add-cart" onclick="addToCart(event, ${p.id})">
               <span class="material-icons" style="font-size:16px">add_shopping_cart</span> Ongeza
             </button>`
          : `<button class="btn-add-cart" style="background:#aaa;cursor:default" disabled>Haipatikani</button>`}
        <button class="btn-detail" onclick="openModal(event, ${p.id})" title="Maelezo zaidi">
          <span class="material-icons" style="font-size:18px">open_in_new</span>
        </button>
      </div>
    </div>`;
  return card;
}

// ── FILTER & SEARCH ──────────────────────────────────────
function filterCategory(catId, btn) {
  activeCatId = catId;
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}

function searchProducts(query) {
  applyFilters(query);
}

function applyFilters(query) {
  const q = (query ?? document.getElementById('search-input').value).toLowerCase();
  filteredProds = allProducts.filter(p => {
    const matchCat  = !activeCatId || p.category_name?.toLowerCase() === getCatName(activeCatId)?.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
  renderProducts(filteredProds);
}

function getCatName(id) {
  return categories.find(c => c.id === id)?.name || '';
}

// ── CART ─────────────────────────────────────────────────
function addToCart(e, productId) {
  e?.stopPropagation();
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  updateCartUI();
  showToast(`✓ ${product.name} imeongezwa`, 'success');
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  updateCartUI();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else updateCartUI();
}

function clearCart() {
  cart = [];
  updateCartUI();
}

function updateCartUI() {
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const badge   = document.getElementById('cart-badge');
  const itemsEl = document.getElementById('cart-items');
  const emptyEl = document.getElementById('cart-empty');
  const footer  = document.getElementById('cart-footer');
  const totalEl = document.getElementById('cart-total-display');
  const currency = shopSettings.currency || CONFIG.CURRENCY;

  badge.style.display = totalItems ? 'flex' : 'none';
  badge.textContent = totalItems;

  if (!cart.length) {
    itemsEl.innerHTML = '';
    emptyEl.style.display = 'flex';
    footer.style.display  = 'none';
    return;
  }

  emptyEl.style.display = 'none';
  footer.style.display  = 'flex';
  totalEl.textContent   = `${currency} ${formatNum(totalPrice)}`;

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      ${item.image_url
        ? `<img class="cart-item-img" src="${getImageUrl(item.image_url)}" alt="${item.name}" onerror="this.style.background='#eee'">`
        : `<div class="cart-item-img" style="background:#e8eaf0;border-radius:8px;display:flex;align-items:center;justify-content:center">
             <span class="material-icons" style="color:#bbb;font-size:20px">inventory_2</span></div>`}
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${currency} ${formatNum(item.price)}</div>
      </div>
      <div class="cart-item-controls">
        <div class="qty-ctrl">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Ondoa">
          <span class="material-icons" style="font-size:18px">delete_outline</span>
        </button>
      </div>
    </div>`).join('');
}

function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
}

// ── WHATSAPP ORDER ───────────────────────────────────────
async function orderViaWhatsApp() {
  if (!cart.length) return;
  const currency     = shopSettings.currency || CONFIG.CURRENCY;
  const shopName     = shopSettings.shop_name || CONFIG.SHOP_NAME;
  const waNumber     = shopSettings.whatsapp_number || CONFIG.WHATSAPP_NUMBER;
  const customerName = document.getElementById('customer-name-input').value.trim() || 'Mteja';
  const customerPhone= document.getElementById('customer-phone-input').value.trim();
  const total        = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // Build WhatsApp message
  let msg = `🛒 *ORDER MPYA — ${shopName}*\n`;
  msg += `━━━━━━━━━━━━━━━━━\n`;
  msg += `👤 Mteja: ${customerName}\n`;
  if (customerPhone) msg += `📱 Simu: ${customerPhone}\n`;
  msg += `━━━━━━━━━━━━━━━━━\n`;
  msg += `*BIDHAA ZILIZOAGIZWA:*\n`;
  cart.forEach((item, i) => {
    msg += `${i + 1}. ${item.name}\n`;
    msg += `   ${item.qty} x ${currency} ${formatNum(item.price)} = ${currency} ${formatNum(item.price * item.qty)}\n`;
  });
  msg += `━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *JUMLA: ${currency} ${formatNum(total)}*\n`;
  msg += `━━━━━━━━━━━━━━━━━\n`;
  msg += `Tafadhali niambie bei ya usafirishaji na namna ya kulipa. Asante! 🙏`;

  // Save order to backend (fire and forget)
  try {
    await fetch(`${CONFIG.API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name:  customerName,
        customer_phone: customerPhone,
        items_json:     cart.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
        total_amount:   total,
      })
    });
  } catch (e) { /* continue even if save fails */ }

  // Open WhatsApp
  window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ── PRODUCT MODAL ────────────────────────────────────────
function openModal(e, productId) {
  e?.stopPropagation();
  modalProduct = allProducts.find(p => p.id === productId);
  if (!modalProduct) return;
  modalQty = 1;

  const currency = shopSettings.currency || CONFIG.CURRENCY;
  const imgWrap  = document.querySelector('.modal-image-wrap');
  imgWrap.innerHTML = modalProduct.image_url
    ? `<img id="modal-img" src="${getImageUrl(modalProduct.image_url)}" alt="${modalProduct.name}" style="width:100%;height:100%;object-fit:cover">`
    : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f0f0f0">
         <span class="material-icons" style="font-size:72px;color:#ccc">inventory_2</span></div>`;

  document.getElementById('modal-name').textContent     = modalProduct.name;
  document.getElementById('modal-category').textContent = modalProduct.category_name || '';
  document.getElementById('modal-desc').textContent     = modalProduct.description || 'Hakuna maelezo ya ziada.';
  document.getElementById('modal-price').textContent    = `${currency} ${formatNum(modalProduct.price)}`;
  document.getElementById('modal-qty').textContent      = '1';

  const addBtn = document.getElementById('modal-add-btn');
  if (!modalProduct.allow_wa_order) {
    addBtn.disabled = true;
    addBtn.style.opacity = '.5';
    addBtn.innerHTML = '<span class="material-icons">block</span> Haipatikani kwa order';
  } else {
    addBtn.disabled = false;
    addBtn.style.opacity = '1';
    addBtn.innerHTML = '<span class="material-icons">add_shopping_cart</span> Weka Kwenye Kikapu';
  }

  document.getElementById('modal-overlay').classList.add('open');
  document.getElementById('product-modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.getElementById('product-modal').classList.remove('open');
  modalProduct = null;
}

function modalQtyChange(delta) {
  modalQty = Math.max(1, modalQty + delta);
  document.getElementById('modal-qty').textContent = modalQty;
}

function addFromModal() {
  if (!modalProduct) return;
  const existing = cart.find(i => i.id === modalProduct.id);
  if (existing) existing.qty += modalQty;
  else cart.push({ ...modalProduct, qty: modalQty });
  updateCartUI();
  showToast(`✓ ${modalProduct.name} (x${modalQty}) imeongezwa`, 'success');
  closeModal();
}

// ── TOAST ────────────────────────────────────────────────
let toastTimer;
function showToast(msg, type = '') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

// ── HELPERS ──────────────────────────────────────────────
function formatNum(n) {
  return Number(n).toLocaleString('en-TZ');
}

function getImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  let base = (CONFIG.API_URL || '').replace(/\/$/, '');
  let safePath = path.replace(/\\/g, '/');
  if (!safePath.startsWith('/')) safePath = '/' + safePath;
  return base + safePath;
}
