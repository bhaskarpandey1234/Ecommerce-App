// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const authMiddleware = async (req) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) throw new Error('Authorization token required');
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   req.user = await User.findById(decoded.userId);
// };

// module.exports = authMiddleware;
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    // Verify token and extract user info
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // Attach the user object to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
