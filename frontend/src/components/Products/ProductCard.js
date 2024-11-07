// src/components/ProductCard.js
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import '../../styles/component.css';
import '../../styles/global.css';

const ProductCard = ({ product }) => {
  const { addProductToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addProductToCart(product, 1); // Add the product with default quantity of 1
  };

  return (
    <div className='product-card' style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '20px' }}>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
