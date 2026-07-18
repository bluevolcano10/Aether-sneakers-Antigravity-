import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Load users and current session from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('aether_users')) || [];
    const activeSession = JSON.parse(localStorage.getItem('aether_session'));
    
    setUsers(storedUsers);
    if (activeSession) {
      setUser(activeSession);
    }
  }, []);

  // Save session updates to localStorage
  const updateSession = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('aether_session', JSON.stringify(updatedUser));
    
    // Also update in users database
    const storedUsers = JSON.parse(localStorage.getItem('aether_users')) || [];
    const updatedUsers = storedUsers.map(u => u.email === updatedUser.email ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('aether_users', JSON.stringify(updatedUsers));
  };

  // Register
  const register = (name, email, password) => {
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      name,
      email,
      password,
      addresses: [],
      orders: []
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('aether_users', JSON.stringify(updatedUsers));

    // Auto login after registration
    setUser(newUser);
    localStorage.setItem('aether_session', JSON.stringify(newUser));
    return newUser;
  };

  // Login
  const login = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('aether_users')) || [];
    const match = storedUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!match) {
      throw new Error('Invalid email or password.');
    }

    setUser(match);
    localStorage.setItem('aether_session', JSON.stringify(match));
    return match;
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('aether_session');
  };

  // Save/Update shipping address
  const saveAddress = (address) => {
    if (!user) return;
    const updatedAddresses = [...user.addresses];
    
    // Simple check: if index matches edit it, else add new
    if (address.id) {
      const idx = updatedAddresses.findIndex(a => a.id === address.id);
      if (idx !== -1) updatedAddresses[idx] = address;
    } else {
      address.id = Date.now().toString();
      updatedAddresses.push(address);
    }

    updateSession({ ...user, addresses: updatedAddresses });
  };

  // Add Order to history
  const addOrder = (order) => {
    if (!user) return;
    const updatedOrders = [order, ...user.orders];
    updateSession({ ...user, orders: updatedOrders });
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, saveAddress, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
