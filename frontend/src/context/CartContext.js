import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true); // Added loading state to manage loading indicator
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        try {
          console.log('Fetching cart for user', user._id); // Log the user ID to confirm the request
          const response = await api.get(`/cart/${user._id}`);
          console.log('Cart data received:', response.data); // Log the cart data to confirm the response
          const items = response.data.items;
          const consolidatedItems = consolidateCartItems(items);
          setCart(consolidatedItems);
          calculateTotals(consolidatedItems);
        } catch (error) {
          console.error('Error fetching cart:', error);
        } finally {
          setLoading(false); // Ensure loading is set to false after the data is fetched or error occurs
        }
      };

      fetchCart();
    } else {
      setLoading(false); // If no user, stop loading
    }
  }, [user]);

  // Function to consolidate cart items (combine quantities of same product)
  const consolidateCartItems = (items) => {
    return items.reduce((acc, item) => {
      const existingItemIndex = acc.findIndex(cartItem => cartItem.product._id === item.product._id);
      if (existingItemIndex >= 0) {
        acc[existingItemIndex].quantity += item.quantity;
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
  };

  const calculateTotals = (cartItems) => {
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setTotalItems(totalItems);
    setTotalPrice(totalPrice);
  };

  const addProductToCart = async (productId, quantity) => {
    try {
      const existingProductIndex = cart.findIndex(item => item.product._id === productId);
      if (existingProductIndex >= 0) {
        const updatedCart = [...cart];
        updatedCart[existingProductIndex].quantity += quantity;
        setCart(updatedCart);
        calculateTotals(updatedCart);
      } else {
        const response = await api.post('/cart', { userId: user._id, productId, quantity });
        setCart(response.data.cart.items);
        calculateTotals(response.data.cart.items);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await api.put(`/cart/${user._id}`, { productId, quantity });
      setCart(response.data.cart.items);
      calculateTotals(response.data.cart.items);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await api.delete(`/cart/${user._id}/${productId}`);
      setCart(response.data.cart.items);
      calculateTotals(response.data.cart.items);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, totalItems, totalPrice, addProductToCart, updateQuantity, removeFromCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => {
  return useContext(CartContext);
};
