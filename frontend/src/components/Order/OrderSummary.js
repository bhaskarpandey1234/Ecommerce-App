// src/components/Order/OrderSummary.js
import React from 'react';
import '../../styles/component.css';
import '../../styles/global.css';

const OrderSummary = ({ order }) => (
  <div className='order-summary'>
    <h3>Order Summary</h3>
    {order.products.map((item) => (
      <div key={item.product._id}>
        <p>{item.product.name} x {item.quantity}</p>
      </div>
    ))}
    <p>Total: ${order.totalAmount}</p>
  </div>
);


export default OrderSummary;
