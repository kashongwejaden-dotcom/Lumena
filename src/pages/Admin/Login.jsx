import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = emailState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Identifiants par défaut pour test : admin@lumena.fr / admin123
    if (email === 'admin@lumena.fr' && password === 'admin123') {
      localStorage.setItem('lumena_admin_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Email ou mot de passe incorrect.');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'var(--color-bg)', padding: '20px' }}>
      <div style={{ backgroundColor: 'var(--color-white)', padding: 'clamp(20px, 5vw, 40px)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ 
            width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-soft-pink)', 
            color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' 
          }}>
            <Lock size={30} />
          </div>
          <h2 style={{ color: 'var(--color-text)', fontFamily: 'var(--font-logo)' }}>Espace Vendeur</h2>
          <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>Connectez-vous pour gérer vos produits</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fff5f5', color: '#e53e3e', padding: '10px 15px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #fc8181' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              className="form-control" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@lumena.fr"
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              className="form-control" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin123"
              required 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', marginTop: '10px' }}>
            Se Connecter
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
            Identifiants par défaut :<br/>
            Email: admin@lumena.fr <br/>
            Mot de passe: admin123
          </p>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}>
          <Link to="/" style={{ color: 'var(--color-text-light)', fontSize: '0.95rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'color 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-light)'}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Retour à la boutique
          </Link>
        </div>
      </div>
    </div>
  );
};

// Fix pour l'import manquant dans le snippet
function emailState(initial) {
    return useState(initial);
}

export default Login;
