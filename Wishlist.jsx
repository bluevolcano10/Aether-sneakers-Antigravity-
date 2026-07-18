import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    updateQty,
    removeFromCart,
    applyPromoCode,
    discountCode,
    discountAmount,
    subtotal,
    finalShipping,
    shippingCost,
    setShippingCost,
    tax,
    total
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState(false);
  const [promoSuccess, setPromoSuccess] = useState(false);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError(false);
    setPromoSuccess(false);

    if (promoInput.trim()) {
      const ok = applyPromoCode(promoInput);
      if (ok) {
        setPromoSuccess(true);
      } else {
        setPromoError(true);
      }
    }
  };

  const handleShippingChange = (e) => {
    setShippingCost(Number(e.target.value));
  };

  if (cart.length === 0) {
    return (
      <section className="section" style={{ minHeight: '100vh', paddingTop: '180px', textAlign: 'center' }}>
        <div className="container">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ marginBottom: '1.5rem', opacity: 0.5 }}>
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '1rem' }}>Bag is Empty</h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>No configurations added to your tracking terminal.</p>
          <button onClick={() => navigate('/shop')} className="btn btn-primary">Return to Shop</button>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ minHeight: '100vh', paddingTop: '140px' }}>
      <div className="container">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '3rem' }}>Bag Checkout</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'start' }}>
          
          {/* LEFT: CART ITEMS LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {cart.map((item) => (
              <div 
                key={item.cartKey} 
                className="glass-panel" 
                style={{
                  padding: '2rem',
                  display: 'flex',
                  gap: '2rem',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                {/* Product Image */}
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ width: '120px', height: '120px', objectFit: 'contain', background: 'rgba(255,255,255,0.01)', borderRadius: '8px' }} 
                />

                {/* Details */}
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', cursor: 'pointer' }} onClick={() => navigate(`/product/${item.id}`)}>
                      {item.name}
                    </h3>
                    <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', fontWeight: 'bold' }}>
                      ${item.price * item.quantity}
                    </span>
                  </div>

                  {/* Attributes selected */}
                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    <span>Size: <strong>US {item.size}</strong></span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      Color: 
                      <span 
                        style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: item.color, border: '1px solid rgba(255,255,255,0.2)', display: 'inline-block' }}
                      />
                    </span>
                  </div>

                  {/* Quantity and Delete */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.1)', padding: '0.2rem' }}>
                      <button 
                        onClick={() => updateQty(item.cartKey, item.quantity - 1)}
                        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', width: '24px', height: '24px' }}
                      >
                        -
                      </button>
                      <span style={{ width: '30px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQty(item.cartKey, item.quantity + 1)}
                        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', width: '24px', height: '24px' }}
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.cartKey)}
                      style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.8rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    >
                      Delete
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>

          {/* RIGHT: SUMMARY PANEL */}
          <aside className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>Order Summary</h2>

            {/* Subtotal details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                <span>${subtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-accent)' }}>
                  <span>Discount ({discountCode})</span>
                  <span>-${discountAmount}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Estimated Tax (8%)</span>
                <span>${tax}</span>
              </div>

              {/* Shipping Selection */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Shipping Speed</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                    <span style={{ display: 'flex', gap: '0.5rem' }}>
                      <input type="radio" name="shipping" value="10" checked={shippingCost === 10} onChange={handleShippingChange} />
                      Standard Courier (3-5 days)
                    </span>
                    <span>{subtotal > 300 ? 'FREE' : '$10'}</span>
                  </label>
                  
                  <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                    <span style={{ display: 'flex', gap: '0.5rem' }}>
                      <input type="radio" name="shipping" value="25" checked={shippingCost === 25} onChange={handleShippingChange} />
                      Express Courier (1-2 days)
                    </span>
                    <span>$25</span>
                  </label>

                  <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                    <span style={{ display: 'flex', gap: '0.5rem' }}>
                      <input type="radio" name="shipping" value="50" checked={shippingCost === 50} onChange={handleShippingChange} />
                      Same-Day Hyper Courier
                    </span>
                    <span>$50</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
              <h4 style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Discount Code</h4>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  placeholder="e.g. FUTURE20" 
                  value={promoInput} 
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="glass-panel"
                  style={{
                    flexGrow: 1,
                    padding: '0.65rem 1rem',
                    color: 'white',
                    border: '1px solid var(--glass-border)',
                    outline: 'none',
                    fontSize: '0.9rem',
                    borderRadius: '4px'
                  }}
                />
                <button type="submit" className="btn btn-secondary" style={{ padding: '0.65rem 1rem', fontSize: '0.75rem' }}>Apply</button>
              </div>
              {promoSuccess && <p style={{ color: '#10B981', fontSize: '0.8rem', marginTop: '0.5rem' }}>Promo code applied successfully.</p>}
              {promoError && <p style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.5rem' }}>Invalid promotional code.</p>}
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '0.5rem' }}>Try codes: <strong>AETHER10</strong> or <strong>FUTURE20</strong></p>
            </form>

            {/* Grand Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', fontWeight: 'bold' }}>
              <span style={{ fontSize: '1.1rem' }}>Total</span>
              <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', color: 'white' }}>${total}</span>
            </div>

            {/* Checkout Action */}
            <button 
              onClick={() => navigate('/checkout')}
              className="btn btn-primary"
              style={{ width: '100%', padding: '1.2rem', marginTop: '1rem' }}
            >
              Checkout Order
            </button>
          </aside>

        </div>

      </div>
    </section>
  );
}
