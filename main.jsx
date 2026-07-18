import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Hydrate wishlist from localStorage on load
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('aether_wishlist')) || [];
    setWishlist(stored);
  }, []);

  // Save changes
  const saveWishlist = (updated) => {
    setWishlist(updated);
    localStorage.setItem('aether_wishlist', JSON.stringify(updated));
  };

  // Toggle item in/out of wishlist
  const toggleWishlist = (product) => {
    const exists = wishlist.some(item => item.id === product.id);
    if (exists) {
      const updated = wishlist.filter(item => item.id !== product.id);
      saveWishlist(updated);
    } else {
      saveWishlist([...wishlist, product]);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
