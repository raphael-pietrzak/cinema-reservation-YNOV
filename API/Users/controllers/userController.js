const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../knexfile').development;
const knex = require('knex')(config);

const userController = {
    register: async (req, res) => {
        console.log('register');
        try {
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const [user] = await knex('users')
                .insert({
                    username,
                    email,
                    password: hashedPassword
                })
                .returning(['id', 'username', 'email']);

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    login: async (req, res) => {
        console.log('login');
        try {
            const { email, password } = req.body;
            const user = await knex('users').where({ email }).first();

            if (!user || !await bcrypt.compare(password, user.password)) {
                return res.status(401).json({ error: 'Identifiants invalides' });
            }

            const token = jwt.sign(
                { userId: user.id },
                'votre_secret_jwt',
                { expiresIn: '24h' }
            );

            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getProfile: async (req, res) => {
        try {
            const user = await knex('users')
                .where({ id: req.userData.userId })
                .select('id', 'username', 'email')
                .first();
            
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    verifyToken: async (req, res) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            
            if (!token) {
                return res.status(401).json({ valid: false, message: 'Token manquant' });
            }

            jwt.verify(token, 'votre_secret_jwt', (err, decoded) => {
                if (err) {
                    return res.status(401).json({ valid: false, message: 'Token invalide' });
                }
                res.json({ valid: true, userId: decoded.userId });
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = userController;
