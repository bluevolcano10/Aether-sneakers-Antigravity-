import React from 'react';
import { motion } from 'framer-motion';
import HeroSneakerCanvas from './HeroSneakerCanvas';
import useMagnetic from '../hooks/useMagnetic';

export default function Hero() {
  const shopBtnRef = useMagnetic(0.3, 70);
  const exploreBtnRef = useMagnetic(0.3, 70);

  // Framer Motion animation presets
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1], // premium custom cubic-bezier
      },
    },
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left: Headline & Call to Action */}
          <motion.div 
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="hero-tagline" variants={itemVariants}>
              Aether Labs // Series 01
            </motion.span>
            
            <motion.h1 className="hero-title" variants={itemVariants}>
              MOVE<br />DIFFERENT.
            </motion.h1>
            
            <motion.p className="hero-desc" variants={itemVariants}>
              Performance meets everyday style. Designed for movement, engineered for comfort, crafted for the future.
            </motion.p>
            
            <motion.div className="hero-buttons" variants={itemVariants}>
              <button 
                ref={shopBtnRef} 
                className="btn btn-primary"
              >
                Shop Now
              </button>
              
              <button 
                ref={exploreBtnRef} 
                className="btn btn-secondary"
              >
                Explore Collection
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Interactive 3D Rotating Sneaker Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            <HeroSneakerCanvas />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
