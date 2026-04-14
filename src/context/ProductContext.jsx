import React, { createContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';

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
  // Safe parsing in case data is badly formatted in DB
  const validPriceUSD = parseFloat(priceUSD) || 0;
  const priceFC = validPriceUSD * exchangeRate;
  return {
    usd: `$${validPriceUSD.toFixed(2)}`,
    fc: `${priceFC.toLocaleString('fr-FR')} FC`
  };
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const [whatsappNumber, setWhatsappNumber] = useState('1234567890');
  const [exchangeRate, setExchangeRate] = useState(2800);

  // Listen to Firestore for settings
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'general'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.whatsappNumber) setWhatsappNumber(data.whatsappNumber);
        if (data.exchangeRate) setExchangeRate(data.exchangeRate);
      }
    });
    return () => unsubscribe();
  }, []);

  // Listen to Firestore for products
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsData = [];
      snapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsData);
    }, (error) => {
      console.error("Firestore Error:", error);
      alert("Erreur de connexion a la base de données. Verifiez votre configuration Firebase.");
    });

    return () => unsubscribe();
  }, []);

  const saveSettings = async (newWhatsapp, newExchangeRate) => {
    try {
      await setDoc(doc(db, 'settings', 'general'), {
        whatsappNumber: newWhatsapp,
        exchangeRate: newExchangeRate
      }, { merge: true });
      alert('Paramètres globaux enregistrés avec succès !');
    } catch (error) {
      console.error("Error saving settings: ", error);
      alert("Erreur lors de la sauvegarde: " + error.message);
    }
  };

  const addProduct = async (product) => {
    try {
      const productToAdd = { ...product };
      // Omit custom id if any, let Firestore generate one
      delete productToAdd.id;
      await addDoc(collection(db, 'products'), productToAdd);
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("Erreur lors de l'ajout du produit: " + error.message);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const productRef = doc(db, 'products', id);
      await updateDoc(productRef, updatedProduct);
    } catch (error) {
      console.error("Error updating product: ", error);
      alert("Erreur lors de la modification: " + error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const productRef = doc(db, 'products', id);
      await deleteDoc(productRef);
    } catch (error) {
      console.error("Error deleting product: ", error);
      alert("Erreur lors de la suppression: " + error.message);
    }
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
      setExchangeRate,
      saveSettings
    }}>
      {children}
    </ProductContext.Provider>
  );
};
