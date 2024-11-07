import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import ProductCard from './ProductCard';
import '../../styles/component.css';
import '../../styles/global.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products') // Fetch products from the backend
      .then((response) => setProducts(response.data)) // Set products in state
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className='product-list'>
      <h1>product list component</h1>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} /> // Pass each product to ProductCard
      ))}
    </div>
  );
};

export default ProductList;
