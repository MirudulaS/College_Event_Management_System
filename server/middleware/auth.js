const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check if user is organizer or admin
module.exports.isOrganizer = function(req, res, next) {
  if (req.user.role === 'organizer' || req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Organizer privileges required.' });
  }
};

// Middleware to check if user is admin
module.exports.isAdmin = function(req, res, next) {
  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
};





