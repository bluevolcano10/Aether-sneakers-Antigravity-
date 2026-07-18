@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Syncopate:wght@700&display=swap');

:root {
  --color-bg: #070707;
  --color-bg-alt: #121212;
  --color-text: #FAFAFA;
  --color-text-muted: #8E8E93;
  --color-accent: #3B82F6; /* Electric Blue */
  --color-accent-glow: rgba(59, 130, 246, 0.4);
  --color-neon-cyan: #00F0FF;
  --color-neon-glow: rgba(0, 240, 255, 0.4);
  --font-display: 'Syncopate', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --glass-bg: rgba(18, 18, 18, 0.6);
  --glass-border: rgba(255, 255, 255, 0.08);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  overflow-x: hidden;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--color-bg);
}
::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent);
}

/* Base Headings & Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  letter-spacing: -0.05em;
  text-transform: uppercase;
  font-weight: 700;
}

p {
  color: var(--color-text-muted);
  line-height: 1.6;
  font-size: 1rem;
}

a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
}

/* Custom Cursor */
.custom-cursor {
  width: 8px;
  height: 8px;
  background-color: var(--color-accent);
  border-radius: 50%;
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  transition: width 0.2s, height 0.2s, background-color 0.2s;
  mix-blend-mode: difference;
}

.custom-cursor-ring {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9998;
  transition: transform 0.08s ease-out, width 0.3s, height 0.3s, border-color 0.3s;
}

.custom-cursor-hovered .custom-cursor {
  width: 16px;
  height: 16px;
  background-color: var(--color-neon-cyan);
}

.custom-cursor-hovered .custom-cursor-ring {
  width: 60px;
  height: 60px;
  border-color: var(--color-accent);
  background-color: rgba(59, 130, 246, 0.05);
}

/* Glassmorphism Classes */
.glass-panel {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
}

/* Form input glass overrides */
input.glass-panel, select.glass-panel {
  background: rgba(18, 18, 18, 0.4);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

input.glass-panel:focus, select.glass-panel:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 15px var(--color-accent-glow);
  background: rgba(25, 25, 25, 0.6);
}

/* Animations */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

@keyframes scan {
  0% { transform: translateY(-100%); }
  50% { transform: translateY(100%); }
  100% { transform: translateY(-100%); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 0 25px rgba(59, 130, 246, 0.6), 0 0 40px rgba(0, 240, 255, 0.2); }
}

/* Common Layout Utilities */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2.5rem;
  position: relative;
  z-index: 10;
}

/* Navbar styles */
.navbar-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 2rem 0;
  border-bottom: 1px solid transparent;
}

.navbar-header.scrolled {
  padding: 1.2rem 0;
  background: rgba(7, 7, 7, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  letter-spacing: -0.08em;
  font-weight: 700;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-logo span {
  color: var(--color-accent);
}

.nav-links {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.nav-item {
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  color: var(--color-text-muted);
  transition: color 0.3s ease;
}

.nav-item:hover, .nav-item.active {
  color: var(--color-text);
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-accent);
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-btn {
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease, transform 0.2s ease;
  position: relative;
}

.nav-btn:hover {
  color: var(--color-text);
  transform: scale(1.1);
}

.cart-count {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--color-accent);
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 100px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 4rem;
  width: 100%;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hero-tagline {
  font-size: 0.9rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-accent);
  font-weight: 600;
}

.hero-title {
  font-size: 5rem;
  line-height: 0.9;
  font-family: var(--font-display);
  background: linear-gradient(135deg, #FFF 0%, #888 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  font-size: 1.15rem;
  max-width: 480px;
  font-weight: 300;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
}

.btn {
  padding: 1.2rem 2.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border-radius: 0;
  border: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-primary {
  background-color: var(--color-text);
  color: var(--color-bg);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-accent);
  color: var(--color-text);
  box-shadow: 0 10px 30px var(--color-accent-glow);
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover:not(:disabled) {
  border-color: var(--color-accent);
  color: var(--color-accent);
  box-shadow: 0 0 20px var(--color-accent-glow);
}

/* Background Canvas */
.bg-canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.hero-canvas-container {
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Featured Collections */
.section {
  padding: 8rem 0;
  position: relative;
  z-index: 10;
}

.section-header {
  margin-bottom: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.section-title {
  font-size: 2.5rem;
  max-width: 500px;
}

.section-subtitle {
  color: var(--color-accent);
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.collection-card {
  height: 480px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.collection-img-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.collection-img-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(7, 7, 7, 0.95) 0%, rgba(7, 7, 7, 0.4) 50%, rgba(7, 7, 7, 0.1) 100%);
  z-index: 2;
}

.collection-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.collection-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2.5rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.collection-name {
  font-size: 1.5rem;
  font-family: var(--font-display);
  color: var(--color-text);
}

.collection-desc {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.collection-link {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-accent);
  font-weight: 600;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.collection-link svg {
  transition: transform 0.3s ease;
}

/* Hover States for Collections */
.collection-card:hover {
  transform: translateY(-10px);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.collection-card:hover .collection-img {
  transform: scale(1.08);
}

.collection-card:hover .collection-link svg {
  transform: translateX(5px);
}

/* Best Sellers */
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.product-card {
  background: rgba(18, 18, 18, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.product-img-container {
  height: 280px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, rgba(30, 30, 30, 0.8) 0%, rgba(7, 7, 7, 0) 70%);
  overflow: hidden;
  cursor: pointer;
}

.product-3d-preview {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.product-card:hover .product-3d-preview {
  opacity: 1;
}

.product-static-img {
  width: 80%;
  height: auto;
  object-fit: contain;
  z-index: 2;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
}

.product-card:hover .product-static-img {
  transform: scale(1.05) rotate(-5deg);
  opacity: 0.1; /* Fade out static img to show 3D */
}

.product-details {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.product-name {
  font-size: 1rem;
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-text);
}

.product-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  font-family: var(--font-display);
}

.product-colors {
  display: flex;
  gap: 0.5rem;
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.85rem;
  color: #FBBF24;
}

.quick-add-btn {
  width: 100%;
  padding: 0.9rem;
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.product-card:hover {
  transform: translateY(-8px);
  border-color: rgba(59, 130, 246, 0.2);
  background: rgba(18, 18, 18, 0.6);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.product-card:hover .quick-add-btn {
  background-color: var(--color-text);
  color: var(--color-bg);
  border-color: var(--color-text);
}

.product-card:hover .quick-add-btn:hover {
  background-color: var(--color-accent);
  color: var(--color-text);
  border-color: var(--color-accent);
  box-shadow: 0 0 15px var(--color-accent-glow);
}

/* Cart Drawer */
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  z-index: 2000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.cart-overlay.open {
  opacity: 1;
  pointer-events: all;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 480px;
  height: 100%;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 2001;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.cart-drawer.open {
  transform: translateX(0);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.cart-title {
  font-size: 1.5rem;
}

.close-cart-btn {
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.close-cart-btn:hover {
  color: var(--color-text);
}

.cart-items {
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-right: -1rem;
  padding-right: 1rem;
}

.cart-item {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 1.5rem;
}

.cart-item-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
}

.cart-item-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.cart-item-name {
  font-size: 0.9rem;
  font-family: var(--font-display);
}

.cart-item-price {
  font-size: 0.95rem;
  font-weight: 600;
}

.cart-item-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cart-qty-btn {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-text);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.2s ease;
}

.cart-qty-btn:hover {
  background-color: var(--color-text);
  color: var(--color-bg);
}

.remove-item-btn {
  background: none;
  border: none;
  color: #EF4444;
  cursor: pointer;
  font-size: 0.8rem;
  margin-left: auto;
}

.cart-footer {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 2rem;
}

.cart-summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
}

.cart-total-label {
  color: var(--color-text-muted);
}

.cart-total-val {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--color-text);
}

/* Footer Section */
.footer {
  background-color: #030303;
  padding: 6rem 0 3rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  position: relative;
  z-index: 10;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 4rem;
  margin-bottom: 4rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer-desc {
  max-width: 320px;
  font-size: 0.95rem;
}

.footer-links-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer-col-title {
  font-size: 0.85rem;
  color: var(--color-text);
  letter-spacing: 0.1em;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  list-style: none;
}

.footer-link {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--color-accent);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 2rem;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

/* Range Input Styling */
input[type="range"] {
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .hero-title {
    font-size: 4rem;
  }
  .collections-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 991px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .hero-canvas-container {
    height: 450px;
    order: -1;
  }
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1.5rem;
  }
  .nav-links {
    display: none; /* Mobile menu needed */
  }
  .hero-title {
    font-size: 3.2rem;
  }
  .collections-grid {
    grid-template-columns: 1fr;
  }
  .products-grid {
    grid-template-columns: 1fr;
  }
  .cart-drawer {
    width: 100%;
    padding: 2rem;
  }
}
