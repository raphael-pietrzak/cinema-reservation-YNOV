const express = require('express');
const auth = require('./middleware/auth');
const userController = require('./controllers/userController');

const app = express();
app.use(express.json());

// Routes
app.post('/auth/register', userController.register);
app.post('/auth/login', userController.login);
app.get('/auth/profile', auth, userController.getProfile);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});