const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if ( !authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Токен байхгүй, нэвтэрнэ үү' })
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.userId).select('-password');

        if ( !req.user ) {
            return res.status(401).json({ message: 'Хэрэглэгч олдсонгүй' });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Token буруу эсвэл хугацаа дууссан' })
    }
};

module.exports = protect;