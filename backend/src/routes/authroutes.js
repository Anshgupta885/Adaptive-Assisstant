const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authcontroller');
const auth = require('../middlewares/auth');
const User = require('../models/usermodel');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
