import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProductList from './components/Products/ProductList';
import Cart from './components/Cart/Cart';
import OrderHistory from './components/Order/OrderHistory';

const App = () => (
  <AuthProvider>
    <CartProvider>
      <OrderProvider>
        <Router>
          <Navigation />
          <div style={{ minHeight: 'calc(100vh - 100px)', paddingTop: '10px' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<OrderHistory />} />

              <Route path="/" element={<Navigate to="/register" />} />
              {/* Redirects "/" to "/products" as the default route */}
            </Routes>
          </div>
          <Footer />
        </Router>
      </OrderProvider>
    </CartProvider>
  </AuthProvider>
);

export default App;
