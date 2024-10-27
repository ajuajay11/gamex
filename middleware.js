const jwt = require('jsonwebtoken'); // Import JWT
const User = require('./models/User'); // Ensure correct path to User model

// Middleware to authenticate and authorize admin users
const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided, access denied' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);

    // Check if user is an admin by `role`
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(401).json({ error: 'Invalid token or unauthorized' });
  }
};


const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided, access denied' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);
    if (!user) {  // User must exist, regardless of role
      return res.status(403).json({ error: 'Access denied' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(401).json({ error: 'Invalid token or unauthorized' });
  }
};


module.exports = {adminAuth, userAuth};
