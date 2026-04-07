import React, { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import ProductCard from '../../components/ProductCard';

const Home = () => {
  const { products } = useContext(ProductContext);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="hero-section" style={{
        position: 'relative',
        padding: '80px 0', /* Un peu moins de padding vertical sur mobile */
        textAlign: 'center',
        marginBottom: '60px',
        overflow: 'hidden',
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {/* Soft pink abstract backgrounds */}
        <div style={{
          position: 'absolute',
          top: '-30%',
          right: '-10%',
          width: '700px',
          height: '700px',
          backgroundColor: 'var(--color-bg-alt)',
          borderRadius: '50% 30% 70% 40% / 40% 60% 40% 60%',
          zIndex: -1,
          opacity: 0.8,
          transform: 'rotate(15deg)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-15%',
          width: '600px',
          height: '600px',
          backgroundColor: 'var(--color-soft-pink)',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          zIndex: -1,
          opacity: 0.6,
          transform: 'rotate(-20deg)'
        }}></div>

        <div className="container" style={{ maxWidth: '800px', position: 'relative', zIndex: 1 }}>
          <span className="fade-in delay-1" style={{ 
            display: 'inline-block', 
            fontSize: '0.9rem', 
            textTransform: 'uppercase', 
            letterSpacing: '4px', 
            color: 'var(--color-text-light)', 
            marginBottom: '15px',
            fontWeight: '600'
          }}>
            Collections Douceur
          </span>
          <h1 className="fade-in delay-2 hero-title">
            Sublimez votre style avec Lumena
          </h1>
          <p className="fade-in delay-3 hero-description">
            Découvrez notre collection d’accessoires élégants et tendance.<br/>
            Sublimez votre style en toute simplicité et commandez facilement via WhatsApp, avec paiement à la livraison.
          </p>
          <a href="#collection" className="btn-primary fade-in delay-3" style={{ letterSpacing: '1px' }}>
            Acheter nos produits
          </a>
        </div>
      </section>

      {/* Featured Products */}
      <section id="collection" className="container" style={{ marginBottom: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '10px', fontWeight: 400 }}>Onze sortes</h2>
          <p style={{ color: 'var(--color-text-light)', fontFamily: 'var(--font-body)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Les essentiels de notre boutique</p>
        </div>
        
        <div className="grid" style={{ gap: '30px' }}>
          {products.map((product, index) => (
            <div key={product.id} className={`fade-in delay-${(index % 3) + 1}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        {products.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <p style={{ color: 'var(--color-text-light)' }}>La collection est encours de préparation.</p>
          </div>
        )}
      </section>
      
      {/* Advantages - Romantique Style (inspiré de l'image) */}
      <section style={{ 
        padding: '60px 0', 
        backgroundColor: 'var(--color-bg-alt)', /* Fond rose pâle */
        color: 'var(--color-text)',
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          <div style={{ backgroundColor: 'var(--color-white)', textAlign: 'center', padding: '30px 20px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ marginBottom: '16px', color: 'var(--color-accent)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '12px', color: 'var(--color-accent)', fontWeight: 400 }}>Qualité artisanale</h3>
            <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Nos chouchous sont fabriqués avec soin. Une douceur incomparable pour protéger vos cheveux et éviter la casse au quotidien.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--color-white)', textAlign: 'center', padding: '30px 20px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ marginBottom: '16px', color: 'var(--color-accent)' }}>
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '12px', color: 'var(--color-accent)', fontWeight: 400 }}>Contact direct</h3>
            <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Notre boutique simplifie les échanges. Vous pouvez commander directement en nous laissant un message via la messagerie.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--color-white)', textAlign: 'center', padding: '30px 20px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ marginBottom: '16px', color: 'var(--color-accent)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M7 15h0M2 9.5h20"></path></svg>
            </div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '12px', color: 'var(--color-accent)', fontWeight: 400 }}>Paiement Flex</h3>
            <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Nous tenons à vous offrir le meilleur service et la plus grande sécurité en vous permettant de payer uniquement à la réception.
            </p>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default Home;
