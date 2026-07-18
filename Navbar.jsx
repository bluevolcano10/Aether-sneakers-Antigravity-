import React from 'react';
import useMagnetic from '../hooks/useMagnetic';

export default function Footer() {
  const brandRef = useMagnetic(0.2, 50);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand Info */}
          <div className="footer-brand">
            <a href="#" ref={brandRef} className="nav-logo" style={{ fontSize: '1.8rem' }}>
              AETHER<span>//</span>
            </a>
            <p className="footer-desc">
              High-end kinetics and aesthetic footwear systems. Merging structural support with avant-garde styling for future exploration.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Collection</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Chronos Series</a></li>
              <li><a href="#" className="footer-link">Phantom Series</a></li>
              <li><a href="#" className="footer-link">Zenith Active</a></li>
              <li><a href="#" className="footer-link">Helix Special</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Research Labs</a></li>
              <li><a href="#" className="footer-link">Sustainability</a></li>
              <li><a href="#" className="footer-link">Careers</a></li>
              <li><a href="#" className="footer-link">Stores</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Support</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Ordering & Shipping</a></li>
              <li><a href="#" className="footer-link">Returns & Refunds</a></li>
              <li><a href="#" className="footer-link">Sizing Guide</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AETHER LABS. ALL RIGHTS RESERVED.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" className="footer-link">PRIVACY POLICY</a>
            <a href="#" className="footer-link">TERMS & CONDITIONS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
