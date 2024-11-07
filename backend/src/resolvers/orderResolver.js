// const { GraphQLList, GraphQLID, GraphQLString, GraphQLFloat } = require('graphql');
// const Order = require('../models/Order');
// const OrderType = require('../schema/types/OrderType'); // Define a GraphQL type for Order
// const authMiddleware = require('../middleware/authmiddleware'); // For authenticated access

// const orderResolver = {
//   orderQueries: {
//     orders: {
//       type: new GraphQLList(OrderType),
//       resolve: async (parent, args, context) => {
//         await authMiddleware(context);
//         return await Order.find({ user: context.user.id });
//       },
//     },
//     order: {
//       type: OrderType,
//       args: { id: { type: GraphQLID } },
//       resolve: async (parent, args, context) => {
//         await authMiddleware(context);
//         return await Order.findById(args.id).populate('products.product');
//       },
//     },
//   },

//   orderMutations: {
//     addOrder: {
//       type: OrderType,
//       args: {
//         products: { type: new GraphQLList(GraphQLID) },
//         totalAmount: { type: GraphQLFloat },
//       },
//       resolve: async (parent, args, context) => {
//         await authMiddleware(context);

//         const order = new Order({
//           user: context.user.id,
//           products: args.products.map((productId) => ({ product: productId, quantity: 1 })),
//           totalAmount: args.totalAmount,
//           status: 'Pending',
//         });
//         return await order.save();
//       },
//     },
//     updateOrderStatus: {
//       type: OrderType,
//       args: {
//         id: { type: GraphQLID },
//         status: { type: GraphQLString },
//       },
//       resolve: async (parent, args, context) => {
//         await authMiddleware(context);
//         return await Order.findByIdAndUpdate(
//           args.id,
//           { status: args.status },
//           { new: true }
//         );
//       },
//     },
//     deleteOrder: {
//       type: OrderType,
//       args: { id: { type: GraphQLID } },
//       resolve: async (parent, args, context) => {
//         await authMiddleware(context);
//         return await Order.findByIdAndDelete(args.id);
//       },
//     },
//   },
// };

// module.exports = orderResolver;
// src/resolvers/orderResolver.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/orders - Place an order
router.post('/', authMiddleware, async (req, res) => {
  const { items } = req.body;
  // Logic to place an order
});

// GET /api/orders/:orderId - Retrieve details of a specific order
router.get('/:orderId', authMiddleware, async (req, res) => {
  const { orderId } = req.params;
  // Logic to get order details
});

// GET /api/orders - Retrieve all orders for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  // Logic to get user's orders
});

module.exports = router;
