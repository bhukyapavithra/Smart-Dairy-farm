import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CustomerDashboard from './pages/customer/Dashboard';
import FarmerDashboard from './pages/farmer/Dashboard';
import FarmerProducts from './pages/farmer/Products';
import FarmerOrders from './pages/farmer/Orders';
import FarmerProfile from './pages/farmer/Profile';
import Search from './pages/customer/Search';
import ProductDetails from './pages/customer/ProductDetails';
import Checkout from './pages/customer/Checkout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="search" element={<Search />} />
                <Route path="products/:id" element={<ProductDetails />} />
                
                {/* Customer Routes */}
                <Route 
                  path="customer/*" 
                  element={
                    <ProtectedRoute userType="customer">
                      <Routes>
                        <Route path="dashboard" element={<CustomerDashboard />} />
                        <Route path="checkout" element={<Checkout />} />
                      </Routes>
                    </ProtectedRoute>
                  } 
                />
                
                {/* Farmer Routes */}
                <Route 
                  path="farmer/*" 
                  element={
                    <ProtectedRoute userType="farmer">
                      <Routes>
                        <Route path="dashboard" element={<FarmerDashboard />} />
                        <Route path="products" element={<FarmerProducts />} />
                        <Route path="orders" element={<FarmerOrders />} />
                        <Route path="profile" element={<FarmerProfile />} />
                      </Routes>
                    </ProtectedRoute>
                  } 
                />
                
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;