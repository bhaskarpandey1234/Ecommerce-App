const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const cors = require('cors'); // Import cors

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
  }));
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log('MongoDB connection error:', error));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); // Register authentication routes
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
