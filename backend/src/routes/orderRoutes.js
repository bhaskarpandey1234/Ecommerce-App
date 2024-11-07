const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/orders - Create a new order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { user, products, totalAmount } = req.body;
    console.log(req.body);

    // Create a new order
    const order = new Order({ user, products, totalAmount });
    await order.save();

    const populatedOrder = await Order.findById(order._id).populate('products.product');
    res.status(201).json({ message: 'Order created successfully', order: populatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
});

// GET /api/orders/:id - Get order by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
});

// GET /api/orders/user/:userId - Get all orders for a specific user
router.get('/user/:userId', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate('products.product');
    // res.status(200).json(orders);
    // const orders = await Order.find({ user: req.params.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

// PUT /api/orders/:id - Update an order status
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('products.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
});

module.exports = router;
