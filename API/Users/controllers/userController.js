const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../knexfile').development;
const knex = require('knex')(config);

const userController = {
    register: async (req, res) => {
        console.log('register');
        try {
            const { username, email, password, role = 'user' } = req.body;

            // Vérifier si l'email existe déjà
            const existingUser = await knex('users').where({ email }).first();
            if (existingUser) {
                return res.status(400).json({ error: 'Cet email est déjà utilisé' });
            }

            // Vérifier si le nom d'utilisateur existe déjà
            const existingUsername = await knex('users').where({ username }).first();
            if (existingUsername) {
                return res.status(400).json({ error: 'Ce nom d\'utilisateur est déjà pris' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            
            const [user] = await knex('users')
                .insert({
                    username,
                    email,
                    password: hashedPassword,
                    role
                })
                .returning(['id', 'username', 'email', 'role']);

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

            if (!user) {
                return res.status(401).json({ error: 'Aucun compte n\'existe avec cet email' });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: 'Mot de passe incorrect' });
            }

            const token = jwt.sign(
                { userId: user.id, role: user.role },
                'votre_secret_jwt',
                { expiresIn: '24h' }
            );

            res.json({ 
                token, 
                user: { 
                    id: user.id, 
                    username: user.username, 
                    email: user.email,
                    role: user.role 
                } 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getProfile: async (req, res) => {
        try {
            const user = await knex('users')
                .where({ id: req.userData.userId })
                .select('id', 'username', 'email', 'role')
                .first();
            
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await knex('users')
                .select('id', 'username', 'email', 'role')
                .orderBy('id');
            
            res.json(users);
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
