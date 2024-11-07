// const { GraphQLList, GraphQLID, GraphQLString, GraphQLFloat, GraphQLBoolean } = require('graphql');
// const Product = require('../models/Product');
// const ProductType = require('../schema/types/ProductType'); // Define a GraphQL type for Product

// const productResolver = {
//   productQueries: {
//     products: {
//       type: new GraphQLList(ProductType),
//       resolve: async () => {
//         return await Product.find({});
//       },
//     },
//     product: {
//       type: ProductType,
//       args: { id: { type: GraphQLID } },
//       resolve: async (parent, args) => {
//         return await Product.findById(args.id);
//       },
//     },
//   },

//   productMutations: {
//     addProduct: {
//       type: ProductType,
//       args: {
//         name: { type: GraphQLString },
//         description: { type: GraphQLString },
//         price: { type: GraphQLFloat },
//         inStock: { type: GraphQLBoolean },
//         imageUrl: { type: GraphQLString },
//       },
//       resolve: async (parent, args) => {
//         const product = new Product({
//           name: args.name,
//           description: args.description,
//           price: args.price,
//           inStock: args.inStock,
//           imageUrl: args.imageUrl,
//         });
//         return await product.save();
//       },
//     },
//     updateProduct: {
//       type: ProductType,
//       args: {
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         description: { type: GraphQLString },
//         price: { type: GraphQLFloat },
//         inStock: { type: GraphQLBoolean },
//         imageUrl: { type: GraphQLString },
//       },
//       resolve: async (parent, args) => {
//         return await Product.findByIdAndUpdate(
//           args.id,
//           {
//             name: args.name,
//             description: args.description,
//             price: args.price,
//             inStock: args.inStock,
//             imageUrl: args.imageUrl,
//           },
//           { new: true }
//         );
//       },
//     },
//     deleteProduct: {
//       type: ProductType,
//       args: { id: { type: GraphQLID } },
//       resolve: async (parent, args) => {
//         return await Product.findByIdAndDelete(args.id);
//       },
//     },
//   },
// };

// module.exports = productResolver;
// src/resolvers/productResolver.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/products - Retrieve all products, with optional filtering by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const products = category ? await Product.find({ category }) : await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products' });
  }
});

// GET /api/products/:id - Retrieve details of a specific product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: 'Product not found' });
  }
});

// POST /api/products - Add a new product (Admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error adding product' });
  }
});

// PUT /api/products/:id - Update an existing product (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product' });
  }
});

// DELETE /api/products/:id - Delete a product (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting product' });
  }
});

module.exports = router;
