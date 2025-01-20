const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

// Routes publiques
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/verify-token', userController.verifyToken);

// Routes protégées
router.use(auth);
router.get('/profile', userController.getProfile);

module.exports = router;