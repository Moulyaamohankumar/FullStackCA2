// Desc: Middleware to verify the token
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '../Config/.env' });

const auth = async (req, res, next) => {
    const tokenAuth = req.headers.authorization;
    if (!tokenAuth) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = tokenAuth.split(' ')[1];
    const secret = process.env.SECRET_KEY;

    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        } else {
            req.userId = decoded.id;
            next();
        }
    });
};

module.exports = auth;