import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || 'profile';
  
  const { user, login, register } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Validation / Feedback States
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Already logged in redirect
  useEffect(() => {
    if (user) {
      navigate(`/${redirect === 'profile' ? 'profile' : redirect}`);
    }
  }, [user, navigate, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isForgot) {
      if (!email) {
        setError('Please enter your email.');
        return;
      }
      setSuccess('Reset codes dispatched to your email.');
      setEmail('');
      setTimeout(() => {
        setIsForgot(false);
        setIsLogin(true);
        setSuccess('');
      }, 3000);
      return;
    }

    if (isLogin) {
      // Login
      if (!email || !password) {
        setError('All fields are required.');
        return;
      }
      try {
        login(email, password);
      } catch (err) {
        setError(err.message);
      }
    } else {
      // Register
      if (!name || !email || !password || !confirmPassword) {
        setError('All fields are required.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      try {
        register(name, email, password);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setIsForgot(false);
    setError('');
    setSuccess('');
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <section className="section" style={{ minHeight: '100vh', paddingTop: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ width: '100%', maxWidth: '480px' }}>
        
        <div className="glass-panel" style={{ padding: '3.5rem' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 'bold' }}>Aether Terminal</span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginTop: '0.5rem' }}>
              {isForgot ? 'Reset Access' : isLogin ? 'Access Session' : 'Register Node'}
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {!isLogin && !isForgot && (
              <div>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glass-panel"
                  style={{ width: '100%', padding: '0.85rem 1.2rem', color: 'white', border: '1px solid var(--glass-border)', outline: 'none', fontSize: '0.9rem' }}
                />
              </div>
            )}

            <div>
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-panel"
                style={{ width: '100%', padding: '0.85rem 1.2rem', color: 'white', border: '1px solid var(--glass-border)', outline: 'none', fontSize: '0.9rem' }}
              />
            </div>

            {!isForgot && (
              <div>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-panel"
                  style={{ width: '100%', padding: '0.85rem 1.2rem', color: 'white', border: '1px solid var(--glass-border)', outline: 'none', fontSize: '0.9rem' }}
                />
              </div>
            )}

            {!isLogin && !isForgot && (
              <div>
                <input 
                  type="password" 
                  placeholder="Confirm Password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="glass-panel"
                  style={{ width: '100%', padding: '0.85rem 1.2rem', color: 'white', border: '1px solid var(--glass-border)', outline: 'none', fontSize: '0.9rem' }}
                />
              </div>
            )}

            {/* Forgot password link */}
            {isLogin && !isForgot && (
              <div style={{ textAlign: 'right' }}>
                <button 
                  type="button"
                  onClick={() => setIsForgot(true)}
                  style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Status Feedback */}
            {error && <p style={{ color: '#EF4444', fontSize: '0.85rem', textAlign: 'center' }}>{error}</p>}
            {success && <p style={{ color: '#10B981', fontSize: '0.85rem', textAlign: 'center' }}>{success}</p>}

            {/* Actions */}
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem', marginTop: '0.5rem' }}
            >
              {isForgot ? 'Send Code' : isLogin ? 'Authenticate' : 'Establish Node'}
            </button>
          </form>

          {/* Toggle Modes */}
          <div style={{ textAlign: 'center', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', fontSize: '0.85rem' }}>
            {isForgot ? (
              <button 
                onClick={() => { setIsForgot(false); setIsLogin(true); setError(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--color-accent)', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Back to Authentication
              </button>
            ) : (
              <span style={{ color: 'var(--color-text-muted)' }}>
                {isLogin ? "New user? " : "Existing node? "}
                <button 
                  onClick={handleToggleMode}
                  style={{ background: 'none', border: 'none', color: 'var(--color-accent)', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
                >
                  {isLogin ? 'Register Terminal' : 'Access Login'}
                </button>
              </span>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
