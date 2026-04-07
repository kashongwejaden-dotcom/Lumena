import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, Settings } from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/admin/login';

  const handleLogout = () => {
    localStorage.removeItem('lumena_admin_auth');
    navigate('/');
  };

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>Lumena.</h2>
          <span>Admin</span>
        </div>
        <nav className="admin-nav">
          <Link to="/admin/dashboard" className="active">
            <LayoutDashboard size={20} />
            <span>Produits</span>
          </Link>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 15px', color: 'var(--color-text-light)', fontWeight: 500, transition: 'all 0.3s ease', textDecoration: 'none' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            <span>Voir la boutique</span>
          </Link>
        </nav>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
