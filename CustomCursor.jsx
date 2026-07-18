import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProductCanvas from './ProductCanvas';
import { useCart } from '../context/CartContext';

const productsData = [
  {
    id: 'aether-running-series-01',
    name: 'Aether Chronos v1',
    price: 340,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop',
    primaryColor: 0x3b82f6,
    glowColor: 0x00f0ff,
    colors: ['#3B82F6', '#00F0FF', '#FAFAFA'],
    stock: 18
  },
  {
    id: 'aether-lifestyle-series-02',
    name: 'Aether Phantom Stealth',
    price: 380,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=400&auto=format&fit=crop',
    primaryColor: 0x8b5cf6,
    glowColor: 0xec4899,
    colors: ['#8B5CF6', '#EC4899', '#121212'],
    stock: 5
  },
  {
    id: 'aether-running-series-03',
    name: 'Aether Zenith Light',
    price: 320,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop',
    primaryColor: 0x10b981,
    glowColor: 0x00f0ff,
    colors: ['#10B981', '#00F0FF', '#EEEEEE'],
    stock: 25
  },
  {
    id: 'aether-basketball-series-04',
    name: 'Aether Helix Solar',
    price: 395,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=400&auto=format&fit=crop',
    primaryColor: 0xf59e0b,
    glowColor: 0xef4444,
    colors: ['#F59E0B', '#EF4444', '#222222'],
    stock: 12
  },
];

export default function BestSellers() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeHoverId, setActiveHoverId] = useState(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const handleQuickAdd = (e, product) => {
    e.stopPropagation(); // prevent navigation to product details page
    try {
      addToCart(product, 1, 9, product.colors[0]);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className="section" id="bestsellers" style={{ backgroundColor: 'rgba(5, 5, 5, 0.4)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div>
            <span className="section-subtitle">Trending Lab Series</span>
            <h2 className="section-title">Best Sellers</h2>
          </div>
          <p style={{ maxWidth: '380px', fontSize: '0.95rem' }}>
            High-demand releases tested by athletes and streetwear curators. Synchronized colorways and reflective details.
          </p>
        </div>

        {/* Products Grid */}
        <motion.div 
          className="products-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {productsData.map((product) => (
            <motion.div 
              key={product.id} 
              className="product-card"
              variants={cardVariants}
              onClick={() => navigate(`/product/${product.id}`)}
              onMouseEnter={() => setActiveHoverId(product.id)}
              onMouseLeave={() => setActiveHoverId(null)}
            >
              {/* Product Visual Container */}
              <div className="product-img-container">
                {/* 3D Interactive Sneaker Canvas (active on hover) */}
                <ProductCanvas 
                  primaryColor={product.primaryColor} 
                  glowColor={product.glowColor} 
                />
                
                {/* Static Image (visible when not hovered) */}
                <img 
                  className="product-static-img" 
                  src={product.image} 
                  alt={product.name} 
                  loading="lazy"
                />
              </div>

              {/* Product Info / Details */}
              <div className="product-details">
                <div className="product-meta">
                  <h3 className="product-name">{product.name}</h3>
                  <span className="product-price">${product.price}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* Color dots preview */}
                  <div className="product-colors">
                    {product.colors.map((c, i) => (
                      <span 
                        key={i} 
                        className="color-dot" 
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>

                  {/* Star Rating */}
                  <div className="product-rating">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* Add to Cart Action */}
                <button 
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="quick-add-btn"
                >
                  Quick Add
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
