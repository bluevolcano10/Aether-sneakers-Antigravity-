import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useMagnetic from '../hooks/useMagnetic';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onCartOpen, cartCount }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const cartBtnRef = useMagnetic(0.4, 60);
  const logoRef = useMagnetic(0.2, 50);
  const profileBtnRef = useMagnetic(0.4, 60);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchVal)}`);
      setSearchOpen(false);
      setSearchVal('');
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        
        {/* Brand Logo */}
        <Link to="/" ref={logoRef} className="nav-logo">
          AETHER<span>//</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          <Link to="/shop?category=Running" className="nav-item">Men</Link>
          <Link to="/shop?category=Training" className="nav-item">Women</Link>
          <Link to="/shop?sortBy=newest" className="nav-item">New Arrivals</Link>
          <Link to="/shop" className="nav-item">Collections</Link>
          <Link to="/wishlist" className="nav-item">Wishlist</Link>
        </nav>

        {/* Action Buttons (Search, Profile, Cart, Mobile Menu) */}
        <div className="nav-actions">
          
          {/* Search Trigger */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {searchOpen && (
              <form onSubmit={handleSearchSubmit} style={{ position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                <input 
                  type="text" 
                  placeholder="Search catalog..." 
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="glass-panel"
                  style={{
                    padding: '0.5rem 1rem',
                    color: 'white',
                    border: '1px solid var(--color-accent)',
                    outline: 'none',
                    borderRadius: '4px',
                    width: '180px',
                    fontSize: '0.8rem'
                  }}
                  autoFocus
                />
              </form>
            )}
            <button onClick={() => setSearchOpen(!searchOpen)} className="nav-btn" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>

          {/* Profile Access Icon */}
          <button 
            ref={profileBtnRef}
            onClick={() => navigate(user ? '/profile' : '/login')}
            className="nav-btn"
            aria-label="Profile"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {user && (
              <span 
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981'
                }}
              />
            )}
          </button>

          {/* Cart Icon with Badge */}
          <button 
            ref={cartBtnRef} 
            onClick={onCartOpen} 
            className="nav-btn" 
            aria-label="Shopping Cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </button>

          {/* Hamburger Menu (Mobile Only) */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="nav-btn mobile-menu-toggle" 
            style={{ display: 'none' }}
            aria-label="Toggle Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div 
          className="glass-panel" 
          style={{
            position: 'fixed',
            top: '70px',
            left: '1.5rem',
            right: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            padding: '2.5rem',
            zIndex: 999,
          }}
        >
          <Link to="/shop?category=Running" onClick={() => setMobileMenuOpen(false)} className="nav-item">Men</Link>
          <Link to="/shop?category=Training" onClick={() => setMobileMenuOpen(false)} className="nav-item">Women</Link>
          <Link to="/shop?sortBy=newest" onClick={() => setMobileMenuOpen(false)} className="nav-item">New Arrivals</Link>
          <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="nav-item">Collections</Link>
          <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="nav-item">Wishlist</Link>
          <Link to={user ? "/profile" : "/login"} onClick={() => setMobileMenuOpen(false)} className="nav-item">{user ? "Profile" : "Login"}</Link>
        </div>
      )}

      {/* CSS to ensure responsive mobile menu display */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
