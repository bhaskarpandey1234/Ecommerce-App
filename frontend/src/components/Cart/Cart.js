import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import { OrderContext } from '../../context/OrderContext';
import '../../styles/component.css';
import '../../styles/global.css';

const Cart = () => {
  const { cart, totalItems, totalPrice, removeFromCart, updateQuantity, loading } = useContext(CartContext);
  const { placeOrder, orderSuccess } = useContext(OrderContext);
  const [orderMessage, setOrderMessage] = useState(null);

  // Fetch userId and token from localStorage
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');
    if (storedUserId && storedToken) {
      setUserId(storedUserId);
      setToken(storedToken);
    }
  }, []);

  const totalAmount = totalPrice;

  if (loading) {
    return <div>Loading your cart...</div>;
  }

  const handlePlaceOrder = async () => {
    try {
      const orderItems = cart.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      }));

      await placeOrder(orderItems, userId, totalAmount, token);

      setOrderMessage('Order created successfully!');
    } catch (error) {
      console.error('Failed to place order:', error);
      setOrderMessage('Failed to place order');
    }
  };

  return (
    <div className='.cart-container'>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className='.cart-container'>
          {cart.map((item) => (
            <div key={item.product._id} style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
              <h3>{item.product.name}</h3>
              <p>Price: ${item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${item.product.price * item.quantity}</p>
              <button onClick={() => removeFromCart(item.product._id)}>Remove</button>
              <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>Increase Quantity</button>
              {item.quantity > 1 && (
                <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>Decrease Quantity</button>
              )}
            </div>
          ))}
          <h3>Total Items: {totalItems}</h3>
          <h3>Total Price: ${totalPrice}</h3>
          <button onClick={handlePlaceOrder}>Place Order</button>
          {orderMessage && <p>{orderMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Cart;
