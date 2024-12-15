const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware for authentication
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'No token provided' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Sample Dashboard Data
router.get('/overview', authMiddleware, (req, res) => {
  res.json({
    metrics: {
      userCount: 150,
      revenue: 5000,
      activeSessions: 45,
    },
  });
});

module.exports = router;
