// src/resolvers/cartResolver.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/cart - Retrieve the user’s cart
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart' });
  }
});

// POST /api/cart - Add an item to the cart
router.post('/', authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  // Logic to add item to cart
});

// PUT /api/cart - Update item quantity in the cart
router.put('/', authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  // Logic to update cart item quantity
});

// DELETE /api/cart/:productId - Remove an item from the cart
router.delete('/:productId', authMiddleware, async (req, res) => {
  const { productId } = req.params;
  // Logic to remove item from cart
});

module.exports = router;
