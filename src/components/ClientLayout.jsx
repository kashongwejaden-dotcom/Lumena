import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import FloatingWhatsApp from './FloatingWhatsApp';
import { ShoppingBag } from 'lucide-react';
import './ClientLayout.css';

const ClientLayout = () => {
  return (
    <div className="client-layout">
      <header className="navbar">
        <div className="container navbar-container">
          <Link to="/" className="logo">
            Lumena.
          </Link>
          <nav className="nav-links">
            <Link to="/">Accueil</Link>
            <Link to="/">Boutique</Link>
            <div className="cart-icon">
              <ShoppingBag size={20} />
            </div>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <h3>Lumena.</h3>
            <p>Sublimez votre style avec notre collection exclusive d'accessoires.</p>
          </div>
          <div className="footer-links">
            <h4>Catégories</h4>
            <Link to="/">Chouchous (Scrunchies)</Link>
            <Link to="/">Bandeaux en Soie</Link>
            <Link to="/">Accessoires & Kits</Link>
          </div>
          <div className="footer-info">
            <h4>Informations</h4>
            <p>Paiement sécurisé à la livraison.</p>
            <p>Support client via WhatsApp.</p>
            <Link to="/admin" className="admin-link">Accès Vendeur</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Lumena. Tous droits réservés.</p>
        </div>
      </footer>

      <FloatingWhatsApp />
    </div>
  );
};

export default ClientLayout;
