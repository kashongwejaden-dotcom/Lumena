import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProductContext, formatPrice } from '../../context/ProductContext';
import { getWhatsAppLink } from '../../utils/whatsappHelper';
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, whatsappNumber, exchangeRate } = useContext(ProductContext);
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container" style={{ padding: '120px 0', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Pièce introuvable</h2>
        <p style={{ color: 'var(--color-text-light)', marginBottom: '30px' }}>Cet article n'est plus disponible dans notre collection.</p>
        <Link to="/" className="btn-primary" style={{ marginTop: '20px' }}>Retour à la collection</Link>
      </div>
    );
  }

  const prices = formatPrice(product.price, exchangeRate);

  const handleWhatsAppOrder = () => {
    const message = `Bonjour Lumena, je souhaite commander : ${product.name} (Prix: ${prices.usd} / ${prices.fc}). Pouvez-vous me confirmer sa disponibilité ?`;
    const link = getWhatsAppLink(whatsappNumber, message);
    window.open(link, '_blank');
  };

  return (
    <div className="fade-in" style={{ padding: '40px 0 100px' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        <button 
          onClick={() => navigate(-1)} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px', color: 'var(--color-text-light)', transition: 'all 0.3s ease', padding: '10px 0' }}
          onMouseOver={(e) => { e.currentTarget.style.color = 'var(--color-text)'; e.currentTarget.style.transform = 'translateX(-5px)'; }}
          onMouseOut={(e) => { e.currentTarget.style.color = 'var(--color-text-light)'; e.currentTarget.style.transform = 'translateX(0)'; }}
        >
          <ArrowLeft size={18} />
          <span>Continuer vos achats</span>
        </button>

        <div className="product-detail-grid">
          
          {/* Product Image Section */}
          <div className="product-detail-image-section">
            <div className="product-detail-image-wrapper">
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-detail-image"
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="product-detail-info-section">
            <div style={{ marginBottom: '40px' }}>
              <span className="product-detail-category">
                {product.category}
              </span>
              <h1 className="product-detail-title">
                {product.name}
              </h1>
              
              <div className="product-detail-price-wrapper">
                <span className="product-detail-price-usd">
                  {prices.usd}
                </span>
                <span className="product-detail-price-fc">
                  / {prices.fc}
                </span>
              </div>
            </div>

            <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-border)', marginBottom: '30px' }}></div>

            <p style={{ color: 'var(--color-text-light)', lineHeight: '1.9', marginBottom: '40px', fontSize: '1.05rem' }}>
              {product.description}
            </p>
            
            <div style={{ backgroundColor: 'var(--color-white)', padding: '24px', border: '1px solid var(--color-border)', marginBottom: '40px' }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: 'var(--color-text)' }}>
                  <span style={{ color: 'var(--color-whatsapp)' }}><Check size={18} /></span>
                  Disponible en stock
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: 'var(--color-text)' }}>
                  <span style={{ color: 'var(--color-accent)' }}><ShieldCheck size={18} /></span>
                  Paiement sécurisé à la livraison
                </li>
              </ul>
            </div>

            <button 
              onClick={handleWhatsAppOrder} 
              className="btn-whatsapp" 
              style={{ padding: '18px 32px', fontSize: '1.05rem', width: '100%', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: 'var(--shadow-md)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}>
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Commander sur WhatsApp
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                Besoin d'aide ? Contactez-nous directement via WhatsApp.
              </span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
