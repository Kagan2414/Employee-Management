const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'You have accessed a protected route!', user: req.user });
});

module.exports = router;


