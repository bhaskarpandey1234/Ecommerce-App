const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Import the Cart model
const Product = require('../models/Product'); // Import the Product model if you need product details
const authMiddleware = require('../middleware/authMiddleware'); // Optional: Use for protected routes

// POST /api/cart - Add an item to the cart
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Update quantity if item already in cart
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    } else {
      // Create a new cart if none exists
      cart = new Cart({ userId, items: [{ product: productId, quantity }] });
    }

    await cart.save();
    res.status(201).json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item to cart', error: error.message });
  }
});

// GET /api/cart/:userId - Get cart items for a user
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart', error: error.message });
  }
});

// PUT /api/cart/:userId - Update an item’s quantity in the cart
router.put('/:userId', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    await cart.save();
    res.status(200).json({ message: 'Cart updated', cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cart', error: error.message });
  }
});

// DELETE /api/cart/:userId/:productId - Remove an item from the cart
router.delete('/:userId/:productId', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove item from cart', error: error.message });
  }
});

// DELETE /api/cart/:userId - Clear the cart
router.delete('/:userId', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ userId: req.params.userId });
    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart', error: error.message });
  }
});

module.exports = router;
