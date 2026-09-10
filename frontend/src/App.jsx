import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider, useAuth } from './components/context/AuthContext';
import { CartProvider } from './components/context/CartContext';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import Cart from './components/pages/Cart';
import Checkout from './components/pages/Checkout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminLogin from './components/auth/AdminLogin';
import AdminDashboard from './components/pages/Admin/AdminDashboard';
import ManageProducts from './components/pages/Admin/ManageProducts';
import ManageOrders from './components/pages/Admin/ManageOrders';

// Admin Route Guard
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

// Private Route Guard
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/checkout" element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          } />
          
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          
          <Route path="/admin/products" element={
            <AdminRoute>
              <ManageProducts />
            </AdminRoute>
          } />
          
          <Route path="/admin/orders" element={
            <AdminRoute>
              <ManageOrders />
            </AdminRoute>
          } />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;