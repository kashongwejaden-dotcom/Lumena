import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext, formatPrice } from '../context/ProductContext';
import { Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { exchangeRate } = useContext(ProductContext);
  const prices = formatPrice(product.price, exchangeRate);

  return (
    <div style={{ position: 'relative' }}>
      <Link to={`/product/${product.id}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div className="product-card" style={{
          backgroundColor: 'var(--color-white)',
          borderRadius: 'var(--radius-lg)', /* Coins très arrondis type romantique */
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          border: '1px solid var(--color-border)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
          e.currentTarget.style.borderColor = 'var(--color-accent)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          e.currentTarget.style.borderColor = 'var(--color-border)';
        }}>
          
          <div style={{ height: '280px', overflow: 'hidden', backgroundColor: 'var(--color-bg-alt)', padding: '15px' }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
            />
          </div>
          
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: 'var(--color-white)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '8px', flex: 1, fontWeight: 700, fontFamily: 'var(--font-logo)', color: 'var(--color-accent)' }}>
              {product.name}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ fontWeight: '500', fontSize: '1.1rem', color: 'var(--color-text)' }}>
                {prices.usd}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                ~ {prices.fc}
              </span>
            </div>

            <button className="btn-primary" style={{ alignSelf: 'center', padding: '10px 24px', fontSize: '0.9rem' }}>
              Voir détails
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
