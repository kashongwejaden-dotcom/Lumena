import React, { useContext, useState, useRef } from 'react';
import { ProductContext, formatPrice } from '../../context/ProductContext';
import { Edit2, Trash2, Plus, X, Upload } from 'lucide-react';

const Dashboard = () => {
  const { products, addProduct, updateProduct, deleteProduct, whatsappNumber, setWhatsappNumber, exchangeRate, setExchangeRate } = useContext(ProductContext);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Chouchous');
  const [image, setImage] = useState('');
  
  const fileInputRef = useRef(null);

  const openModal = (product = null) => {
    if (product) {
      setEditingId(product.id);
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setImage(product.image);
    } else {
      setEditingId(null);
      setName('');
      setPrice('');
      setDescription('');
      setCategory('Chouchous');
      setImage('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      name,
      price: parseFloat(price),
      description,
      category,
      image: image || '/images/scrunchie_pink.png' // Fallback image si vide
    };

    if (editingId) {
      updateProduct(editingId, productData);
    } else {
      addProduct(productData);
    }
    closeModal();
  };

  return (
    <div className="fade-in">
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', gap: '15px', flexWrap: 'wrap' }}>
        <h1 style={{ fontSize: '1.8rem', margin: 0 }}>Gestion des Produits</h1>
        <button onClick={() => openModal()} className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
          <Plus size={20} />
          <span>Ajouter</span>
        </button>
      </div>

      {/* Settings Section */}
      <div className="admin-settings-grid" style={{ 
        backgroundColor: 'var(--color-white)', 
        padding: '20px', 
        borderRadius: 'var(--radius-md)', 
        boxShadow: 'var(--shadow-sm)', 
        marginBottom: '30px', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '20px' 
      }}>
        <div>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>Numéro WhatsApp Vendeuse</label>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '10px' }}>Format international (ex: 33612345678 sans le +)</p>
          <input 
            type="text" 
            value={whatsappNumber} 
            onChange={(e) => setWhatsappNumber(e.target.value)}
            className="form-control"
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>Taux de change (1 USD = ? FC)</label>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '10px' }}>Appliqué à tous les prix de la boutique</p>
          <input 
            type="number" 
            value={exchangeRate} 
            onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 0)}
            className="form-control"
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Products Table Wrapper for Horizontal Scroll on Mobile */}
      <div style={{ backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '15px 20px', fontWeight: '600', color: 'var(--color-text-light)' }}>Image</th>
              <th style={{ padding: '15px 20px', fontWeight: '600', color: 'var(--color-text-light)' }}>Nom</th>
              <th style={{ padding: '15px 20px', fontWeight: '600', color: 'var(--color-text-light)' }}>Catégorie</th>
              <th style={{ padding: '15px 20px', fontWeight: '600', color: 'var(--color-text-light)' }}>Prix</th>
              <th style={{ padding: '15px 20px', fontWeight: '600', color: 'var(--color-text-light)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              const prices = formatPrice(product.price, exchangeRate);
              return (
                <tr key={product.id} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background-color 0.2s ease' }} className="hover-row">
                  <td style={{ padding: '10px 20px' }}>
                    <img src={product.image} alt={product.name} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                  </td>
                  <td style={{ padding: '10px 20px', fontWeight: '500' }}>{product.name}</td>
                  <td style={{ padding: '10px 20px' }}>
                    <span style={{ padding: '4px 10px', backgroundColor: 'var(--color-bg)', borderRadius: '20px', fontSize: '0.85rem' }}>{product.category}</span>
                  </td>
                  <td style={{ padding: '10px 20px', fontWeight: '600' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span>{prices.usd}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>{prices.fc}</span>
                    </div>
                  </td>
                  <td style={{ padding: '10px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button onClick={() => openModal(product)} style={{ padding: '8px', color: '#3182ce', backgroundColor: '#ebf8ff', borderRadius: 'var(--radius-sm)', transition: 'all 0.2s' }}>
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => { if(window.confirm('Voulez-vous vraiment supprimer ce produit ?')) deleteProduct(product.id) }} style={{ padding: '8px', color: '#e53e3e', backgroundColor: '#fff5f5', borderRadius: 'var(--radius-sm)', transition: 'all 0.2s' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: 'var(--color-text-light)' }}>
                  Aucun produit. Cliquez sur "Ajouter" pour commencer.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px' }}>
          <div style={{ backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-md)', width: '100%', maxWidth: '600px', maxHeight: '95vh', overflowY: 'auto', padding: '25px', position: 'relative' }} className="fade-in">
            <button onClick={closeModal} style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--color-text-light)' }}>
              <X size={24} />
            </button>
            <h2 style={{ marginBottom: '20px' }}>{editingId ? 'Modifier le produit' : 'Ajouter un produit'}</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Image du produit</label>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
                  {image && (
                    <img src={image} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
                  )}
                  <div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      style={{ display: 'none' }} 
                    />
                    <button type="button" onClick={() => fileInputRef.current.click()} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Upload size={16} /> Parcourir...
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Nom du produit</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="admin-form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Prix de base (en USD - $)</label>
                  <input type="number" step="0.01" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                  <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                    {price ? formatPrice(parseFloat(price), exchangeRate).usd : '$0.00'} / {price ? formatPrice(parseFloat(price), exchangeRate).fc : '0 FC'}
                  </p>
                </div>
                <div className="form-group">
                  <label className="form-label">Catégorie</label>
                  <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Chouchous">Chouchous (Scrunchies)</option>
                    <option value="Bandeaux">Bandeaux</option>
                    <option value="Kits">Kits & Coffrets</option>
                    <option value="Accessoires (Pinces, etc.)">Accessoires (Pinces, etc.)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required rows="4"></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' }}>
                <button type="button" onClick={closeModal} className="btn-outline">Annuler</button>
                <button type="submit" className="btn-primary">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
