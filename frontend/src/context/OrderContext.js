import React, { createContext, useState } from 'react';
import api from '../services/api';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const fetchOrders = async (userId, token) => {
    try {
      // Use the user-specific endpoint to fetch orders
      const response = await api.get(`/orders/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const placeOrder = async (orderItems, userId, totalAmount, token) => {
    try {
      // Structure the request body according to the updated API
      const orderData = {
        user: userId,
        products: orderItems.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
        })),
        totalAmount: totalAmount,
      };

      const response = await api.post('/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Order created:', response.data);

      // Set success message after order is placed
      setOrderSuccess('Order created successfully!');
      
      // Optionally, refetch orders after placing a new order
      await fetchOrders(userId, token);
    } catch (error) {
      console.error('Failed to place order:', error);
      setOrderSuccess('Failed to place order');
    }
  };

  return (
    <OrderContext.Provider value={{ orders, fetchOrders, placeOrder, orderSuccess }}>
      {children}
    </OrderContext.Provider>
  );
};
