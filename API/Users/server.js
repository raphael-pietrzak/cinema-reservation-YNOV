const express = require('express');
const userRoutes = require('./routes/userRoutes');
// cors
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configuration des routes
app.use('/auth', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});