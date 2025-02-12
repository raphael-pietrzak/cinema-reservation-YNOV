const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'votre_secret_jwt');
    req.userData = { 
      userId: decodedToken.userId,
      role: decodedToken.role 
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentification échouée' });
  }
};

module.exports = auth;
