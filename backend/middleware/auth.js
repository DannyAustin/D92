const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Try to get token from cookie first
  let token = req.cookies.token;
  
  // If no cookie token, try to get from Authorization header
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'a658d1dcef1aedc5e138cde64b9394aa745f0544c61fa73c859315618382f257');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = { authMiddleware };
