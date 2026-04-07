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
          
          <div className="product-card-image-container">
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-card-image"
            />
          </div>
          
          <div className="product-card-info">
            <h3 className="product-card-title">
              {product.name}
            </h3>
            
            <div className="product-card-price-container">
              <span className="product-card-price-usd">
                {prices.usd}
              </span>
              <span className="product-card-price-fc">
                ~ {prices.fc}
              </span>
            </div>

            <button className="btn-primary product-card-btn">
              Voir détails
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
