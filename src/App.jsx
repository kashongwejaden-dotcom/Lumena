import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClientLayout from './components/ClientLayout';
import AdminLayout from './components/AdminLayout';

// Client Pages
import Home from './pages/Client/Home';
import ProductDetail from './pages/Client/ProductDetail';

// Admin Pages
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('lumena_admin_auth') === 'true';
  };

  const AdminRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/admin/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetail />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path="login" element={<Login />} />
          <Route 
            path="dashboard" 
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
