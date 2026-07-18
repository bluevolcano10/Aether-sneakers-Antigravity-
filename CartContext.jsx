import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProductCanvas from './ProductCanvas';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState(false);

  // Map product properties to Three.js colors (or fallback if undefined)
  const primaryColor = product.primaryColor || 
    (product.colors && product.colors[0] ? parseInt(product.colors[0].replace('#', '0x')) : 0x3b82f6);
  
  const glowColor = product.glowColor || 
    (product.colors && product.colors[1] ? parseInt(product.colors[1].replace('#', '0x')) : 0x00f0ff);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    try {
      // Default to size 9 and first color
      const defaultSize = product.sizes && product.sizes[0] ? product.sizes[0] : 9;
      const defaultColor = product.colors && product.colors[0] ? product.colors[0] : '#FAFAFA';
      addToCart(product, 1, defaultSize, defaultColor);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div 
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* Product Image & 3D Canvas */}
      <div className="product-img-container">
        {/* 3D Model on Hover */}
        <ProductCanvas primaryColor={primaryColor} glowColor={glowColor} />
        
        {/* Static Image */}
        <img 
          className="product-static-img" 
          src={product.images.front} 
          alt={product.name} 
          loading="lazy"
        />

        {product.discount > 0 && (
          <span 
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              backgroundColor: 'var(--color-accent)',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: '700',
              padding: '0.35rem 0.75rem',
              zIndex: 3,
              fontFamily: 'var(--font-display)'
            }}
          >
            -{product.discount}% OFF
          </span>
        )}
      </div>

      {/* Info Details */}
      <div className="product-details">
        <div className="product-meta">
          <h3 className="product-name" style={{ fontSize: '0.95rem' }}>{product.name}</h3>
          <span className="product-price">${product.price}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Colors */}
          <div className="product-colors">
            {product.colors.map((c, i) => (
              <span 
                key={i} 
                className="color-dot" 
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* Rating */}
          <div className="product-rating">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>{product.rating}</span>
          </div>
        </div>

        <button 
          onClick={handleQuickAdd}
          className="quick-add-btn"
        >
          Quick Add
        </button>
      </div>
    </div>
  );
}
