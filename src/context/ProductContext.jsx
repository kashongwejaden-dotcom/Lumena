import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

const defaultProducts = [
  {
    id: '1',
    name: 'Chouchou en Satin Rose Doux',
    price: 3.5, // Price in USD
    description: 'Un magnifique chouchou en satin doux, parfait pour protéger vos cheveux sans les casser tout en apportant une touche chic.',
    image: '/images/scrunchie_pink.png',
    category: 'Chouchous'
  },
  {
    id: '2',
    name: 'Bandeau Élégant Nœud',
    price: 5.0,
    description: 'Bandeau élégant et confortable, idéal pour votre routine beauté ou pour finaliser un look.',
    image: '/images/scrunchie_pink.png', // Temporary fallback
    category: 'Bandeaux'
  },
  {
    id: '3',
    name: 'Set de 3 Chouchous Soie',
    price: 8.5,
    description: 'Un set de 3 chouchous en soie de première qualité, couleurs élégantes variées.',
    image: '/images/scrunchie_pink.png', // Temporary fallback
    category: 'Kits'
  }
];

export const formatPrice = (priceUSD, exchangeRate) => {
  const priceFC = priceUSD * exchangeRate;
  return {
    usd: `$${priceUSD.toFixed(2)}`,
    fc: `${priceFC.toLocaleString('fr-FR')} FC`
  };
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('lumena_products_v2');
    if (saved) {
      return JSON.parse(saved);
    }
    return defaultProducts;
  });

  const [whatsappNumber, setWhatsappNumber] = useState(() => {
    const saved = localStorage.getItem('lumena_whatsapp');
    return saved || '1234567890';
  });

  const [exchangeRate, setExchangeRate] = useState(() => {
    const saved = localStorage.getItem('lumena_exchange_rate');
    return saved ? parseFloat(saved) : 2800; // Default 1 USD = 2800 FC
  });

  useEffect(() => {
    localStorage.setItem('lumena_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('lumena_whatsapp', whatsappNumber);
  }, [whatsappNumber]);

  useEffect(() => {
    localStorage.setItem('lumena_exchange_rate', exchangeRate.toString());
  }, [exchangeRate]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now().toString() }]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      whatsappNumber,
      setWhatsappNumber,
      exchangeRate,
      setExchangeRate
    }}>
      {children}
    </ProductContext.Provider>
  );
};
