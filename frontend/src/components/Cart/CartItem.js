// src/components/CartItem.js
import React from 'react';
import '../../styles/component.css';
import '../../styles/global.css';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => (
  <div className='cart-page' style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
    <h4>{item.product.name}</h4>
    <p>Price: ${item.product.price}</p>
    <p>Quantity: {item.quantity}</p>
    <button onClick={() => onUpdateQuantity(item.product._id, item.quantity + 1)}>+</button>
    <button onClick={() => onUpdateQuantity(item.product._id, item.quantity - 1)}>-</button>
    <button onClick={() => onRemove(item.product._id)}>Remove</button>
  </div>
);

export default CartItem;
