import React from 'react';
import { motion } from 'framer-motion';

const collectionsData = [
  {
    name: 'Running',
    desc: 'Propulsive cushioning engineered for vertical velocity and speed.',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=600&auto=format&fit=crop',
    link: '#running'
  },
  {
    name: 'Lifestyle',
    desc: 'Uncompromising techwear aesthetics for urban navigation.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop',
    link: '#lifestyle'
  },
  {
    name: 'Basketball',
    desc: 'Maximum ankle lockdown and energy return for high-impact jumps.',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop',
    link: '#basketball'
  },
  {
    name: 'Training',
    desc: 'Low-profile stability and lateral support for gym versatility.',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop',
    link: '#training'
  },
  {
    name: 'Office Hybrid',
    desc: 'Clean matte leather finishes hiding responsive athletic outsoles.',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop',
    link: '#office'
  },
  {
    name: 'Limited Edition',
    desc: 'Exclusive collaboration releases. Vaulted futuristic designs.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop',
    link: '#limited'
  }
];

export default function Collections() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="section" id="collections">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div>
            <span className="section-subtitle">Categories</span>
            <h2 className="section-title">Curated Labs</h2>
          </div>
          <p style={{ maxWidth: '380px', fontSize: '0.95rem' }}>
            Exploratory designs segmented for specific kinetic patterns. Built to alter how you navigate terrain.
          </p>
        </div>

        {/* Collections Grid */}
        <motion.div 
          className="collections-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {collectionsData.map((col, idx) => (
            <motion.div 
              key={idx} 
              className="collection-card"
              variants={cardVariants}
            >
              <div className="collection-img-wrapper">
                <img 
                  className="collection-img" 
                  src={col.image} 
                  alt={col.name} 
                  loading="lazy"
                />
              </div>
              
              <div className="collection-info">
                <h3 className="collection-name">{col.name}</h3>
                <p className="collection-desc">{col.desc}</p>
                <a href={col.link} className="collection-link">
                  Explore 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
