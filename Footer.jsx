import React from 'react';
import useMagnetic from '../hooks/useMagnetic';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem }) {
  const checkoutBtnRef = useMagnetic(0.3, 80);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* Background blur overlay */}
      <div 
        className={`cart-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2 className="cart-title">Cart</h2>
          <button onClick={onClose} className="close-cart-btn" aria-label="Close Cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Cart items list */}
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '4rem' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1.5rem', opacity: 0.5 }}>
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p>Your bag is empty.</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Add some futuristic luxury to get moving.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img className="cart-item-img" src={item.image} alt={item.name} />
                
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <span className="cart-item-price">${item.price}</span>
                  
                  <div className="cart-item-controls">
                    {/* Decrease quantity */}
                    <button 
                      onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                      className="cart-qty-btn"
                    >
                      -
                    </button>
                    
                    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{item.quantity}</span>
                    
                    {/* Increase quantity */}
                    <button 
                      onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                      className="cart-qty-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove item */}
                <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="remove-item-btn"
                  aria-label="Remove item"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Panel */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-row">
              <span className="cart-total-label">Subtotal</span>
              <span className="cart-total-val">${subtotal}</span>
            </div>
            
            <div className="cart-summary-row" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <button 
              ref={checkoutBtnRef}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1rem', padding: '1.4rem' }}
              onClick={() => alert('Checkout flow initiated. Proceeding to payment.')}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
